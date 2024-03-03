using System.Text;
using System.Text.Json;
using Common.Configurations.RabbitMq;
using Core.BLL.DataTransferObjects;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;

namespace Core.BLL.Services;

public class OperationHistorySender
{
    private readonly IOptions<RabbitMqConfiguration> _configuration;

    public OperationHistorySender(IOptions<RabbitMqConfiguration> configuration)
    {
        _configuration = configuration;
    }

    public Task SendOperationHistoryMessage(OperationHistoryMessage messageDto)
    {
        var factory = new ConnectionFactory() { HostName = _configuration.Value.HostName };
        try
        {
            using var connection = factory.CreateConnection();
            using var channel = connection.CreateModel();
            channel.ExchangeDeclare(
                exchange: _configuration.Value.ExchangeName,
                type: ExchangeType.Fanout
            );

            var message = JsonSerializer.Serialize(messageDto);
            var body = Encoding.UTF8.GetBytes(message);

            channel.BasicPublish(
                exchange: _configuration.Value.ExchangeName,
                routingKey: "",
                basicProperties: null,
                body: body
            );
        }
        catch (Exception e)
        {
            // TODO: log error
        }
        return Task.CompletedTask;
    }
}
