using backend.Domain.Enums;
using Carter;
using MediatR;
using System.Security.Claims;

namespace backend.Features.Settings.ProfileSettings.UpdateSponsor
{
    public class UpdateSponsorProfileEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app) 
        {
            app.MapPatch("/api/user/sponsor/update", async (ClaimsPrincipal user, UpdateSponsorProfileRequest request, ISender sender) =>
            {
                var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

                if (string.IsNullOrEmpty(userId))
                {
                    return Results.Unauthorized();
                }

                var command = new UpdateSponsorProfileCommand
                {
                    UserId = userId,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Description = request.Description,
                    Email = request.Email,
                    CompanyName = request.CompanyName,
                    OrgNumber = request.OrgNumber,
                    PhotoUrl = request.PhotoUrl,
                    PhotoPublicId = request.PhotoPublicId
                };

                var result = await sender.Send(command);

                if (!result.Success)
                {
                    if (result.ErrorMessage == "User not found")
                    {
                        return Results.NotFound(result);
                    }

                    return Results.BadRequest(result);
                }

                return Results.Ok(result);
            }).WithTags("User");
        }
    }
}
