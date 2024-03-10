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

namespace Core.BLL.Services;

public class RabbitMqListenerService : BackgroundService
{
    private readonly IConnection _connection;
    private readonly IModel _channel;
    private readonly ILogger<RabbitMqListenerService> _logger;
    private readonly IOptions<RabbitMqConfiguration> _configuration;
    private readonly IServiceScopeFactory _serviceScopeFactory;

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
                _logger.LogInformation("Core received message");
                var rawMessage = Encoding.UTF8.GetString(eventArgs.Body.ToArray());
                _logger.LogInformation("Message: {name}", rawMessage);
                var message = JsonSerializer.Deserialize<UpdateAccountBalanceMessage>(rawMessage);
                if (message == null)
                    throw new InvalidOperationException();

                using var scope = _serviceScopeFactory.CreateScope();
                var service = scope.ServiceProvider.GetRequiredService<AccountBalanceService>();
                await service.UpdateAccountBalance(message);
                _channel.BasicAck(eventArgs.DeliveryTag, false);
                _logger.LogInformation("Core processed message");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while processing message");
            }
        };

        _channel.BasicConsume(
            queue: _configuration.Value.ReceiveQueueName,
            autoAck: false,
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
