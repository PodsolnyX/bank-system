using System.Reflection;
using System.Text.Json.Serialization;
using Common.Auth.ApiKeyAuthorization;
using Common.Configurations.RabbitMq;
using Core.BLL.Extensions;
using Microsoft.OpenApi.Models;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

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
    option.UseApiKeyAuthorization();

    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Bank: Core", Version = "v1" });
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    option.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

var logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .CreateLogger();
builder.Logging.ClearProviders();
builder.Logging.AddSerilog(logger);


builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddServices(builder.Configuration);

builder
    .Services.AddOptions<RabbitMqConfiguration>()
    .Bind(builder.Configuration.GetSection("RabbitMq"));

var app = builder.Build();

await app.MigrateDbAsync();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseApiKeyMiddleware();

app.UseCors();

app.MapControllers();
app.Run();
