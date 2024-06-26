using System.Reflection;
using System.Text.Json.Serialization;
using Common.Exception;
using Common.Serilog;
using Microsoft.OpenApi.Models;
using Observer.BLL.Extensions;
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
builder.Services.AddServices(builder.Configuration);
builder.Services.AddDatabase(builder.Configuration);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Observer", Version = "v1" });
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    option.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

builder.Logging.ConfigureSerilog(false);

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
