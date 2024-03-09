using System.Reflection;
using System.Text.Json.Serialization;
using Common.Auth.ApiKeyAuthorization;
using Common.Exception;
using Hangfire;
using Loan.BLL.DataTransferObjects;
using Loan.BLL.Extensions;
using Loan.BLL.Services;
using Microsoft.OpenApi.Models;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => {
    options.AddDefaultPolicy(
        policy => {
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddServices(builder.Configuration);

builder.Services.AddControllers().AddJsonOptions(opts => {
    var enumConverter = new JsonStringEnumConverter();
    opts.JsonSerializerOptions.Converters.Add(enumConverter);
});

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.UseApiKeyAuthorization();

    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Bank: Loan", Version = "v1" });
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    option.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

builder
    .Services.AddOptions<InternalApiQuery>()
    .Bind(builder.Configuration.GetSection(InternalApiQuery.ApiQueries));

var logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .CreateLogger();
builder.Logging.ClearProviders();
builder.Logging.AddSerilog(logger);

var app = builder.Build();

await app.MigrateDbAsync();

app.UseHangfireDashboard();

RecurringJob.AddOrUpdate<PaymentRequestJob>("PaymentRequestJob", x => x.ExecutePayment(),"0 12 * * *");

app.UseSwagger();
app.UseSwaggerUI();

app.UseErrorHandleMiddleware();

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseApiKeyMiddleware();

app.UseCors();


app.MapControllers();
app.Run();