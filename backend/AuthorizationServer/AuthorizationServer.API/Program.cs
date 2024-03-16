using AuthorizationServer.BLL.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

builder.Services.SetupAuthorization();
builder.Services.AddServices();
builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddConfiguredOpenIddict();
builder.Services.AddClientSeeder();

var app = builder.Build();

await app.CreateDbAsync();
await app.SeedIdentity();

app.UseDeveloperExceptionPage();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapDefaultControllerRoute();

app.Run();
