using AuthorizationServer.BLL.Services;
using AuthorizationServer.MVC.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthorizationServer.MVC.Controllers;

[ApiExplorerSettings(IgnoreApi = true)]
[Route("account")]
public class AccountController : Controller
{
    private readonly UserService _userService;
    private readonly ILogger<AccountController> _logger;

    public AccountController(UserService userService, ILogger<AccountController> logger)
    {
        _userService = userService;
        _logger = logger;
    }

    [HttpGet("register")]
    [AllowAnonymous]
    public IActionResult Register(string returnUrl)
    {
        _logger.LogInformation("Get register page");
        ViewData["ReturnUrl"] = returnUrl;
        return View();
    }

    [HttpPost("register")]
    [AllowAnonymous]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Register(RegisterViewModel model)
    {
        ViewData["ReturnUrl"] = model.ReturnUrl;

        if (!ModelState.IsValid)
        {
            _logger.LogError("Invalid model state");
            return View(model);
        }

        try
        {
            _logger.LogInformation("Registering user");
            await _userService.Register(model.Email, model.Password);
            _logger.LogInformation("User registered");
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error registering user");
            ModelState.AddModelError(string.Empty, e.Message);
            return View(model);
        }

        return RedirectToAction(nameof(HomeController.Index), "Home");
    }

    [HttpGet("login")]
    [AllowAnonymous]
    public IActionResult Login(string returnUrl)
    {
        _logger.LogInformation("Get login page");
        ViewData["ReturnUrl"] = returnUrl;
        return View();
    }

    [HttpPost("login")]
    [AllowAnonymous]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginViewModel model)
    {
        ViewData["ReturnUrl"] = model.ReturnUrl;

        if (!ModelState.IsValid)
        {
            _logger.LogError("Invalid model state");
            return View(model);
        }

        try
        {
            await _userService.Login(model.Email, model.Password);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error logging in user");
            ModelState.AddModelError(string.Empty, e.Message);
            return View(model);
        }

        if (Url.IsLocalUrl(model.ReturnUrl))
        {
            return Redirect(model.ReturnUrl);
        }

        return RedirectToAction(nameof(HomeController.Index), "Home");
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _userService.Logout();
        return RedirectToAction(nameof(HomeController.Index), "Home");
    }
}
