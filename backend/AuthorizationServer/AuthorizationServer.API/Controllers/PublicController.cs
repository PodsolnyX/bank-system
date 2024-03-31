using AuthorizationServer.BLL.DataTransferObjects;
using AuthorizationServer.BLL.Services;
using Microsoft.AspNetCore.Mvc;

namespace AuthorizationServer.MVC.Controllers;

[Route("public")]
public class PublicController : Controller
{
    private readonly UserService _userService;

    public PublicController(UserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{userId:guid}")]
    public async Task<UserPublicInfo> GetUserPublicInfo(Guid userId)
    {
        return await _userService.GetUserPublicInfo(userId);
    }
}
