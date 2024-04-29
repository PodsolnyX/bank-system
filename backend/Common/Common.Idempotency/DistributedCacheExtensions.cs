using Microsoft.Extensions.DependencyInjection;

namespace Common.Idempotency;

public static class DistributedCacheExtensions
{
    public static IServiceCollection AddIdempotencyDistributedCache(
        this IServiceCollection services
    )
    {
        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = "redis:6379";
            options.InstanceName = "Idempotency";
        });

        return services;
    }
}
