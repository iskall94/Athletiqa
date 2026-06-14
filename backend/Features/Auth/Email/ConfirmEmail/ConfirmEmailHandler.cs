using backend.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace backend.Features.Auth.Email.ConfirmEmail;
public class ConfirmEmailHandler(UserManager<ApplicationUser> userManager) : IRequestHandler<ConfirmEmailCommand, IdentityResult>
{
    public async Task<IdentityResult> Handle(ConfirmEmailCommand request, CancellationToken ct)
    {
        var user = await userManager.FindByIdAsync(request.UserId);

        if (user == null)
        {
            return IdentityResult.Failed(new IdentityError { Description = "User not found." });
        }

        var decodedToken = Uri.UnescapeDataString(request.Token);

        return await userManager.ConfirmEmailAsync(user, decodedToken);
    }
}