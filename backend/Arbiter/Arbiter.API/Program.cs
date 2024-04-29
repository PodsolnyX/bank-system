using System.Reflection;
using System.Text.Json.Serialization;
using Arbiter.BLL.DataTransferObjects;
using Arbiter.BLL.Extensions;
using Arbiter.BLL.Services;
using Common.Exception;
using Common.Idempotency;
using Common.Serilog;
using Hangfire;
using Microsoft.OpenApi.Models;
using Observer.BLL.Middlewares;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});
builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddServices(builder.Configuration);

builder
    .Services.AddControllers()
    .AddJsonOptions(opts =>
    {
        var enumConverter = new JsonStringEnumConverter();
        opts.JsonSerializerOptions.Converters.Add(enumConverter);
    });

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Bank: Arbiter", Version = "v1" });
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    option.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});
builder
    .Services.AddOptions<InternalApiQueries>()
    .Bind(builder.Configuration.GetSection(InternalApiQueries.ApiQueries));

builder.Logging.ConfigureSerilog();
builder.Services.AddIdempotencyDistributedCache();

var app = builder.Build();

await app.MigrateDbAsync();
app.UseSwagger();
app.UseSwaggerUI();
app.UseHangfireDashboard();

RecurringJob.AddOrUpdate<RequestLoanJob>(
    "RequestLoanJob",
    x => x.RequestLoanTransactions(),
    "* * * * * *"
);
RecurringJob.AddOrUpdate<RequestLoanChargeJob>(
    "RequestLoanChargeJob",
    x => x.RequestLoanChargeTransactions(),
    "* * * * * *"
);

app.UseHttpsRedirection();

app.UseCors();

app.UseErrorHandleMiddleware();
app.UseHttpCollectorMiddleware();
app.UseDoomMiddleware();
app.UseIdempotencyMiddleware();

app.MapControllers();
app.Run();
