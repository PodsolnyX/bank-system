namespace Common.Configuration;

public class RabbitMqConfiguration
{
    public string HostName { get; set; }

    public string ReceiveExchangeName { get; set; }
    public string ReceiveQueueName { get; set; }

    public string SendExchangeName { get; set; }
}
