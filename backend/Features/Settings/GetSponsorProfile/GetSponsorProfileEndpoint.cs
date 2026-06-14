using Carter;
using MediatR;
using System.Security.Claims;

namespace backend.Features.Settings.GetSponsorProfile
{
    public class GetSponsorProfileEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/api/user/sponsor/profile", async (ClaimsPrincipal user, ISender sender) =>
            {
                var AspNetUser = user.FindFirstValue(ClaimTypes.NameIdentifier);

                if (string.IsNullOrEmpty(AspNetUser))
                {
                    return Results.Unauthorized();
                }

                var result = await sender.Send(new GetSponsorProfileQuery(AspNetUser));

                if (!result.Success)
                {
                    return Results.NotFound(result);
                }

                return Results.Ok(result);
            }).RequireAuthorization()
              .WithTags("User")
              .WithName("GetSponsorProfile");
        }
    }
}
