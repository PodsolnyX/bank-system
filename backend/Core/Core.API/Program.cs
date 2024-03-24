using System.Reflection;
using System.Text.Json.Serialization;
using Common.Auth.ApiKeyAuthorization;
using Common.Auth.Jwt;
using Common.Configuration;
using Common.Exception;
using Core.BLL.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
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
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidIssuer = "http://localhost:7005",
            ValidateAudience = false,
            ValidAudiences = new[] { "client" },
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Convert.FromBase64String("DRjd/GnduI3Efzen9V9BvbNUfc/VKgXltV7Kbk9sMkY=")
            ),
            ValidateIssuerSigningKey = true,
        };
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
    option.UseJwtAuthorization();

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

app.UseErrorHandleMiddleware();

app.UseHttpsRedirection();
app.UseAuthorization();

app.UseCors();

app.MapControllers();
app.Run();
