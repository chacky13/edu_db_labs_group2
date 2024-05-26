using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Models;
using WebApplication1.Validation;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public UserController(ApplicationDbContext db)
    {
        _db = db;
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody]UserLogin userLogin)
    {
        var user = new Users(userLogin.email, userLogin.password);
        var existingUser = _db.Users.FirstOrDefault(u => u.email == user.email && u.password == user.password);
        LoginValidator validator = new LoginValidator();
        ValidationResult result = await validator.ValidateAsync(user);
        
        if (!result.IsValid)
        {
            return BadRequest(result.Errors[0].ErrorMessage);
        }
        
        if (existingUser != null && user.email == existingUser.email)
        {
            return Ok("You have successfully logged into your account");
        }
        
        return BadRequest("You must first register");
        
    }

    [HttpGet("get_all_users")]
    public Task<IActionResult> GetAllUsers()
    {
       
        var allUsers = _db.Users;
        return Task.FromResult<IActionResult>(Ok(allUsers));
        
    }
}