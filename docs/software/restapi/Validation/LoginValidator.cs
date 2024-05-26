using FluentValidation;
using WebApplication1.Models;

namespace WebApplication1.Validation;

public class LoginValidator:AbstractValidator<Users>
{
    public LoginValidator()
    {
        RuleFor(users => users.email).NotEmpty().MaximumLength(30);
        RuleFor(users => users.password).NotEmpty().MaximumLength(50);
    }
}