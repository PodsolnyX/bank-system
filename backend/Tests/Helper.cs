using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Json;
using Microsoft.IdentityModel.Tokens;

namespace Tests;

public class Helper
{
    private const string ServerUrl = "http://109.107.189.133";

    //private const string ServerUrl = "http://localhost";

    private const string CoreApiUrl = ServerUrl + ":7002";
    private const string OperationApiUrl = ServerUrl + ":7004";

    public async Task<Guid> CreateAccount(HttpClient client)
    {
        var response = await client.PostAsync($"{CoreApiUrl}/account/user", null);
        var responseString = await response.Content.ReadAsStringAsync();
        var responseObject = JsonSerializer.Deserialize<Dictionary<string, object>>(responseString);
        try
        {
            var accountId = responseObject["id"].ToString();

            return Guid.Parse(accountId);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<Dictionary<string, object>> GetAccount(HttpClient client, Guid accountId)
    {
        var response = await client.GetAsync($"{CoreApiUrl}/account/user/{accountId}");
        var responseString = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<Dictionary<string, object>>(responseString);
    }

    public async Task Deposit(HttpClient client, Guid accountId, int amount)
    {
        var response = await client.PostAsync(
            $"{CoreApiUrl}/account/user/{accountId}/deposit?Amount={amount}",
            null
        );
        if (!response.IsSuccessStatusCode)
        {
            var responseString = await response.Content.ReadAsStringAsync();
            throw new Exception(responseString);
        }
    }

    public async Task<List<Dictionary<string, object>>> GetOperations(HttpClient client)
    {
        var response = await client.GetAsync($"{OperationApiUrl}/operation-history/user");
        var responseString = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<List<Dictionary<string, object>>>(responseString);
    }

    public async Task<string> Authorize(Guid userId)
    {
        List<Claim> claims =
        [
            new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
            new Claim(ClaimTypes.Role, "Employee"),
            new Claim(ClaimTypes.Role, "Client"),
        ];

        var key = new SymmetricSecurityKey(
            Convert.FromBase64String("DRjd/GnduI3Efzen9V9BvbNUfc/VKgXltV7Kbk9sMkY=")
        );
        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: cred
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public HttpClient GetClient(string token)
    {
        var client = new HttpClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        return client;
    }
}
