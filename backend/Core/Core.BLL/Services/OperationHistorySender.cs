using System.Text;
using System.Text.Json;
using Common.Configuration;
using Common.DataTransfer;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;

namespace Core.BLL.Services;

public class OperationHistorySender
{
    private readonly IOptions<RabbitMqConfiguration> _configuration;
    private readonly ILogger<OperationHistorySender> _logger;

    public OperationHistorySender(
        IOptions<RabbitMqConfiguration> configuration,
        ILogger<OperationHistorySender> logger
    )
    {
        _configuration = configuration;
        _logger = logger;
    }

    public void SendOperationHistoryMessage(OperationHistoryMessage messageDto)
    {
        var factory = new ConnectionFactory() { HostName = _configuration.Value.HostName };
        try
        {
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
            _logger.LogError(e, "Error while sending operation history message");
            throw;
        }
    }
}
