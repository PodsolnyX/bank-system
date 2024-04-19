using AuthorizationServer.BLL.Extensions;
using Common.Exception;
using Microsoft.OpenApi.Models;
using Observer.BLL.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "AuthorizationServer.API", Version = "v1" });
    c.AddSecurityDefinition(
        "OpenId",
        new OpenApiSecurityScheme
        {
            Type = SecuritySchemeType.OpenIdConnect,
            Name = "Authorization",
            In = ParameterLocation.Header,
            Scheme = "Bearer",
            Flows = new OpenApiOAuthFlows
            {
                AuthorizationCode = new OpenApiOAuthFlow
                {
                    AuthorizationUrl = new Uri($"https://coto-dev.ru/connect/authorize"),
                    TokenUrl = new Uri($"https://coto-dev.ru/connect/token"),
                    Scopes = new Dictionary<string, string>
                    {
                        { "openid", "openid" },
                        { "api", "api" },
                    },
                },
            },
            OpenIdConnectUrl = new Uri($"https://coto-dev.ru/.well-known/openid-configuration"),
        }
    );

    c.AddSecurityRequirement(
        new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "OpenId",
                    },
                },
                new List<string> { "api", "openid" }
            },
        }
    );
});

builder.Services.SetupAuthorization();
builder.Services.AddServices();
builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddConfiguredOpenIddict();
builder.Services.AddClientSeeder();

var app = builder.Build();

await app.CreateDbAsync();
await app.SeedIdentity();
await app.SeedAdmin();

app.UseDeveloperExceptionPage();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.OAuthUsePkce();
    c.OAuthClientId("client");
    c.OAuthClientSecret("client-secret");
    c.EnablePersistAuthorization();
    c.OAuthScopes("api", "openid");
});

app.UseCors();
app.UseStaticFiles();

app.UseRouting();

app.UseHttpCollectorMiddleware();
app.UseDoomMiddleware();

app.UseAuthentication();
app.UseAuthorization();

app.MapDefaultControllerRoute();

app.Run();
