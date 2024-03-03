using System.Text;
using System.Text.Json;
using Common.Configurations.RabbitMq;
using Core.BLL.DataTransferObjects;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using OperationHistory.DAL;
using OperationHistory.DAL.Entities;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace OperationHistory.BLL.Services;

public class RabbitMqListenerService : BackgroundService
{
    private readonly IConnection _connection;
    private readonly IModel _channel;
    private readonly IOptions<RabbitMqConfiguration> _configuration;
    private readonly IServiceScopeFactory _serviceScopeFactory;

    /// <summary>
    /// Constructor
    /// </summary>
    public RabbitMqListenerService(
        IOptions<RabbitMqConfiguration> configuration,
        IServiceScopeFactory serviceScopeFactory
    )
    {
        _configuration = configuration;
        _serviceScopeFactory = serviceScopeFactory;

        var factory = new ConnectionFactory() { HostName = _configuration.Value.HostName };
        _connection = factory.CreateConnection();
        _channel = _connection.CreateModel();
        _channel.ExchangeDeclare(
            exchange: _configuration.Value.ExchangeName,
            type: ExchangeType.Fanout
        );

        var queueName = _channel.QueueDeclare(queue: _configuration.Value.QueueName).QueueName;
        _channel.QueueBind(
            queue: queueName,
            exchange: _configuration.Value.ExchangeName,
            routingKey: string.Empty
        );
    }

    /// <summary>
    /// Executes service
    /// </summary>
    /// <param name="stoppingToken"></param>
    /// <returns></returns>
    /// <exception cref="InvalidOperationException"></exception>
    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        stoppingToken.ThrowIfCancellationRequested();

        var consumer = new EventingBasicConsumer(_channel);
        consumer.Received += async (_, eventArgs) =>
        {
            try
            {
                var rawMessage = Encoding.UTF8.GetString(eventArgs.Body.ToArray());
                var message = JsonSerializer.Deserialize<OperationHistoryMessage>(rawMessage);
                if (message == null)
                    throw new InvalidOperationException();

                using (var scope = _serviceScopeFactory.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<OpHistoryDbContext>();
                    await dbContext.Operations.AddAsync(
                        new Operation()
                        {
                            Id = message.Id,
                            UserId = message.UserId,
                            AccountId = message.AccountId,
                            LoanId = message.LoanId,
                            CurrencyType = message.CurrencyType,
                            Type = message.OperationType,
                            Status = message.OperationStatus,
                            Amount = message.Amount,
                            Message = message.Message,
                            DateTime = message.DateTime
                        },
                        stoppingToken
                    );

                    await dbContext.SaveChangesAsync(stoppingToken);
                }
            }
            catch (Exception ex)
            {
                //TODO: log exception
            }
        };

        _channel.BasicConsume(
            queue: _configuration.Value.QueueName,
            autoAck: true,
            consumer: consumer
        );

        return Task.CompletedTask;
    }

    /// <summary>
    /// Disposes service
    /// </summary>
    public override void Dispose()
    {
        _channel.Close();
        _connection.Close();
        base.Dispose();
    }
}
