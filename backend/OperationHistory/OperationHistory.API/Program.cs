using System.Reflection;
using System.Text.Json.Serialization;
using Common.Auth.Jwt;
using Common.Configuration;
using Common.Exception;
using Common.Idempotency;
using Common.Serilog;
using Microsoft.OpenApi.Models;
using Observer.BLL.Middlewares;
using OperationHistory.BLL.Extensions;
using OperationHistory.BLL.Hubs;
using OperationHistory.BLL.Jobs;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .WithOrigins("null")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .SetIsOriginAllowed(_ => true);
    });
});
builder
    .Services.AddControllers()
    .AddJsonOptions(opts =>
    {
        var enumConverter = new JsonStringEnumConverter();
        opts.JsonSerializerOptions.Converters.Add(enumConverter);
    });
builder.Services.AddJwtAuthorization();

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.UseJwtAuthorization();

    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Bank: Operation History", Version = "v1" });
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    option.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});
builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddServices(builder.Configuration);
builder.Services.AddSignalR();

builder.Logging.ConfigureSerilog();
builder.Services.AddIdempotencyDistributedCache();

builder
    .Services.AddOptions<RabbitMqConfiguration>()
    .Bind(builder.Configuration.GetSection("RabbitMq"));

var app = builder.Build();

await app.MigrateDbAsync();
await app.ConfigureDatabaseSeed();

app.UseSwagger();
app.UseSwaggerUI();
app.ConfigureJobs();

app.UseHttpCollectorMiddleware();
app.UseErrorHandleMiddleware();
app.UseDoomMiddleware();
app.UseIdempotencyMiddleware();

//app.UseHttpsRedirection();
app.UseAuthorization();

app.UseCors();
app.UseWebSockets();

app.MapControllers();
app.MapHub<NotificationHub>("/api/notifications");

app.Run();
