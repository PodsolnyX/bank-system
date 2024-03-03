using System.ComponentModel.DataAnnotations;

namespace Auth.BLL.DataTransferObjects;

public class UserRegisterDto {
    [Required]
    public string Mail { get; set; }
    [Required]
    public string Name { get; set; }
}