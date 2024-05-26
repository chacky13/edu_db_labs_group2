using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models;

public class Users
{
    public Users(string email, string password)
    {
        this.email = email;
        this.password = password;
    }
    
    [Key]
    public int id { get; set; }
    [Required]
    public string password { get; set; }
    [Required]
    public string email { get; set; }
    public int role_id { get; set; }
}