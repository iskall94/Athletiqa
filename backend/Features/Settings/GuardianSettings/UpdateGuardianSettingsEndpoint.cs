using backend.Domain.Enums;
using Carter;
using MediatR;
using System.Security.Claims;

namespace backend.Features.Settings.GuardianSettings
{

    public record UpdateGuardianSettingsRequest(string? FirstName, string? LastName, GuardianRelationship? Relationship, string? Email, string? PhoneNumber);
    public class UpdateGuardianSettingsEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPatch("/api/guardian/update", async (ClaimsPrincipal user, UpdateGuardianSettingsRequest request, ISender sender) =>
            {
                var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

                if (string.IsNullOrEmpty(userId))
                {
                    return Results.Unauthorized();
                }

                var command = new UpdateGuardianSettingsCommand
                {
                    UserId = userId,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Relationship = request.Relationship,
                    Email = request.Email,
                    PhoneNumber = request.PhoneNumber
                };

                var result = await sender.Send(command);

                if (!result.Success)
                {
                    return Results.BadRequest(result);
                }

                return Results.Ok(result);

            });
        }
    }
}
