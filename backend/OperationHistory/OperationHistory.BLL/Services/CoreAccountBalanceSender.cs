using System.Text;
using System.Text.Json;
using Common.Configuration;
using Common.DataTransfer;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;

namespace OperationHistory.BLL.Services;

public class CoreAccountBalanceSender
{
    private readonly IOptions<RabbitMqConfiguration> _configuration;
    private readonly ILogger<CoreAccountBalanceSender> _logger;

    public CoreAccountBalanceSender(
        IOptions<RabbitMqConfiguration> configuration,
        ILogger<CoreAccountBalanceSender> logger
    )
    {
        _configuration = configuration;
        _logger = logger;
    }

    public void SendCoreAccountBalanceMessage(UpdateAccountBalanceMessage messageDto)
    {
        var factory = new ConnectionFactory() { HostName = _configuration.Value.HostName };
        try
        {
            _logger.LogInformation("Try send message to Core");
            using var connection = factory.CreateConnection();
            using var channel = connection.CreateModel();
            channel.ExchangeDeclare(
                exchange: _configuration.Value.SendExchangeName,
                type: ExchangeType.Fanout
            );

            var message = JsonSerializer.Serialize(messageDto);
            var body = Encoding.UTF8.GetBytes(message);

            channel.BasicPublish(
                exchange: _configuration.Value.SendExchangeName,
                routingKey: "",
                basicProperties: null,
                body: body
            );
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error while sending message to Core");
            throw;
        }
    }
}
