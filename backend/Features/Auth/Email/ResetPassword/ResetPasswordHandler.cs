using backend.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace backend.Features.Auth.Email.ResetPassword;

public class ResetPasswordHandler(UserManager<ApplicationUser> userManager) : IRequestHandler<ResetPasswordCommand, bool>
{
    public async Task<bool> Handle(ResetPasswordCommand command, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(command.Email);
        if (user == null)
        {
            return false;
        }

        var result = await userManager.ResetPasswordAsync(user, command.ResetCode, command.NewPassword);

        return result.Succeeded;
    }
}