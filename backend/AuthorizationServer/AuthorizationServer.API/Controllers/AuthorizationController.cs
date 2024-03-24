using System.Security.Claims;
using AuthorizationServer.BLL.Services;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;

namespace AuthorizationServer.MVC.Controllers;

public class AuthorizationController : Controller
{
    private readonly UserService _userService;

    public AuthorizationController(UserService userService)
    {
        _userService = userService;
    }

    [HttpPost("~/connect/token")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public async Task<IActionResult> Exchange()
    {
        var request =
            HttpContext.GetOpenIddictServerRequest()
            ?? throw new InvalidOperationException(
                "The OpenID Connect request cannot be retrieved."
            );

        ClaimsPrincipal claimsPrincipal;

        if (request.IsClientCredentialsGrantType())
        {
            var identity = new ClaimsIdentity(
                OpenIddictServerAspNetCoreDefaults.AuthenticationScheme
            );

            identity.AddClaim(
                OpenIddictConstants.Claims.Subject,
                request.ClientId ?? throw new InvalidOperationException()
            );

            claimsPrincipal = new ClaimsPrincipal(identity);

            claimsPrincipal.SetScopes(request.GetScopes());
        }
        else if (request.IsAuthorizationCodeGrantType())
        {
           
            claimsPrincipal = (
                await HttpContext.AuthenticateAsync(
                    OpenIddictServerAspNetCoreDefaults.AuthenticationScheme
                )
            ).Principal!;
            claimsPrincipal.SetDestinations(static claim => claim.Type switch
            {
                // If the "profile" scope was granted, allow the "name" claim to be
                // added to the access and identity tokens derived from the principal.
                OpenIddictConstants.Claims.Name when claim.Subject.HasScope(OpenIddictConstants.Permissions.Scopes.Profile) => new[]
                {
                    OpenIddictConstants.Destinations.AccessToken,
                    OpenIddictConstants.Destinations.IdentityToken
                },

                // Never add the "secret_value" claim to access or identity tokens.
                // In this case, it will only be added to authorization codes,
                // refresh tokens and user/device codes, that are always encrypted.
                "secret_value" => Array.Empty<string>(),

                // Otherwise, add the claim to the access tokens only.
                _ => new[]
                {
                    OpenIddictConstants.Destinations.AccessToken
                }
            });
            // var roles = await _userService.GetRoles(
            //     claimsPrincipal.GetClaim(OpenIddictConstants.Claims.Subject));
            //
            // foreach (var role in roles)
            // {
            //     ((ClaimsIdentity)claimsPrincipal.Identity).AddClaim(new Claim(ClaimTypes.Role, role));
            // }
        }
        else if (request.IsRefreshTokenGrantType())
        {
            claimsPrincipal = (
                await HttpContext.AuthenticateAsync(
                    OpenIddictServerAspNetCoreDefaults.AuthenticationScheme
                )
            ).Principal!;
        }
        else
        {
            throw new InvalidOperationException("The specified grant type is not supported.");
        }

        return SignIn(claimsPrincipal, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
    }

    [HttpGet("~/connect/authorize")]
    [HttpPost("~/connect/authorize")]
    [IgnoreAntiforgeryToken]
    [ApiExplorerSettings(IgnoreApi = true)]
    public async Task<IActionResult> Authorize()
    {
        var request =
            HttpContext.GetOpenIddictServerRequest()
            ?? throw new InvalidOperationException(
                "The OpenID Connect request cannot be retrieved."
            );

        var result = await HttpContext.AuthenticateAsync(
            CookieAuthenticationDefaults.AuthenticationScheme
        );

        if (!result.Succeeded)
        {
            return Challenge(
                authenticationSchemes: CookieAuthenticationDefaults.AuthenticationScheme,
                properties: new AuthenticationProperties
                {
                    RedirectUri =
                        Request.PathBase
                        + Request.Path
                        + QueryString.Create(
                            Request.HasFormContentType
                                ? Request.Form.ToList()
                                : Request.Query.ToList()
                        )
                }
            );
        }

        var claimsPrincipal = result.Principal;
        claimsPrincipal.SetScopes(request.GetScopes());

        return SignIn(claimsPrincipal, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
    }

    [Authorize(AuthenticationSchemes = OpenIddictServerAspNetCoreDefaults.AuthenticationScheme)]
    [HttpGet("~/connect/userinfo")]
    public async Task<IActionResult> Userinfo()
    {
        var claimsPrincipal = (
            await HttpContext.AuthenticateAsync(
                OpenIddictServerAspNetCoreDefaults.AuthenticationScheme
            )
        ).Principal;

        var roles = await _userService.GetRoles(
            claimsPrincipal.GetClaim(OpenIddictConstants.Claims.Subject)
        );

        return Ok(
            new
            {
                Name = claimsPrincipal.GetClaim(OpenIddictConstants.Claims.Subject),
                Roles = roles,
                Sub = claimsPrincipal.GetClaim(OpenIddictConstants.Claims.Subject)
            }
        );
    }
}
