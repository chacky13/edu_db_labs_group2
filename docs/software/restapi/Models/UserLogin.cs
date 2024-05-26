using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models;

public class UserLogin
{
    [Required]
    public string email { get; set; }
    [Required]
    public string password { get; set; }
}