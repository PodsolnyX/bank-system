using System.Reflection;
using System.Text.Json.Serialization;
using Common.Auth.Jwt;
using Common.Exception;
using Common.Idempotency;
using Common.Serilog;
using Hangfire;
using Loan.BLL.DataTransferObjects;
using Loan.BLL.Extensions;
using Loan.BLL.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
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

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.UseJwtAuthorization();

    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Bank: Loan", Version = "v1" });
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    option.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

builder
    .Services.AddOptions<InternalApiQuery>()
    .Bind(builder.Configuration.GetSection(InternalApiQuery.ApiQueries));

builder.Logging.ConfigureSerilog();
builder.Services.AddIdempotencyDistributedCache();

var app = builder.Build();

await app.MigrateDbAsync();

app.UseHangfireDashboard();

RecurringJob.AddOrUpdate<PaymentRequestJob>(
    "PaymentRequestJob",
    x => x.ExecutePayment(),
    "0 12 * * *"
);

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpCollectorMiddleware();
app.UseErrorHandleMiddleware();
app.UseDoomMiddleware();
app.UseIdempotencyMiddleware();

app.UseHttpsRedirection();
app.UseAuthorization();

app.UseCors();

app.MapControllers();
app.Run();
