using System.ComponentModel.DataAnnotations;

namespace AuthorizationServer.MVC.Models;

public class RegisterViewModel
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MinLength(4)]
    public string Password { get; set; }
    public string ReturnUrl { get; set; }
}
