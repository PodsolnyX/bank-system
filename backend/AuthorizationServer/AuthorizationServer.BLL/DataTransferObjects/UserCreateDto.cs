using System.ComponentModel.DataAnnotations;

namespace AuthorizationServer.BLL.DataTransferObjects;

public class UserCreateDto {
    [Required]
    public string Mail { get; set; }
    [Required]
    public string Name { get; set; }
    public bool IsEmployee { get; set; } = false;   
}