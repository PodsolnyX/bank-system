using Hangfire;
using Microsoft.AspNetCore.Builder;

namespace OperationHistory.BLL.Jobs;

public static class ConfigureJobExtension
{
    public static void ConfigureJobs(this IApplicationBuilder app)
    {
        app.UseHangfireDashboard();

        RecurringJob.AddOrUpdate<CalculateOperationAggregationJob>(
            nameof(CalculateOperationAggregationJob),
            x => x.Execute(),
            "1 * * * * *"
        );
    }
}
