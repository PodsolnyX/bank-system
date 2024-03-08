using System.Text;
using System.Text.Json;
using Common.Configuration;
using Common.DataTransfer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace OperationHistory.BLL.Services;

public class RabbitMqListenerService : BackgroundService
{
    private readonly IConnection _connection;
    private readonly IModel _channel;
    private readonly IOptions<RabbitMqConfiguration> _configuration;
    private readonly IServiceScopeFactory _serviceScopeFactory;
    private readonly ILogger<RabbitMqListenerService> _logger;

    /// <summary>
    /// Constructor
    /// </summary>
    public RabbitMqListenerService(
        IOptions<RabbitMqConfiguration> configuration,
        IServiceScopeFactory serviceScopeFactory,
        ILogger<RabbitMqListenerService> logger
    )
    {
        _configuration = configuration;
        _serviceScopeFactory = serviceScopeFactory;
        _logger = logger;

        var factory = new ConnectionFactory() { HostName = _configuration.Value.HostName };
        _connection = factory.CreateConnection();
        _channel = _connection.CreateModel();
        _channel.ExchangeDeclare(
            exchange: _configuration.Value.ReceiveExchangeName,
            type: ExchangeType.Fanout
        );

        var queueName = _channel
            .QueueDeclare(queue: _configuration.Value.ReceiveQueueName)
            .QueueName;
        _channel.QueueBind(
            queue: queueName,
            exchange: _configuration.Value.ReceiveExchangeName,
            routingKey: string.Empty
        );
    }

    /// <summary>
    /// Executes service
    /// </summary>
    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        stoppingToken.ThrowIfCancellationRequested();

        var consumer = new EventingBasicConsumer(_channel);
        consumer.Received += async (_, eventArgs) =>
        {
            try
            {
                _logger.LogInformation("Received message from Core");
                var rawMessage = Encoding.UTF8.GetString(eventArgs.Body.ToArray());
                var message = JsonSerializer.Deserialize<OperationHistoryMessage>(rawMessage);
                if (message == null)
                    throw new InvalidOperationException();

                using var scope = _serviceScopeFactory.CreateScope();
                var service = scope.ServiceProvider.GetRequiredService<OperationHistoryService>();
                await service.AddOperationHistory(message);
                service.EnqueueUpdateAccountBalance(message.AccountId);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error while processing message from Core");
            }
        };

        _channel.BasicConsume(
            queue: _configuration.Value.ReceiveQueueName,
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
