using Carter;
using MediatR;
using System.Security.Claims;

namespace backend.Features.Settings.GetAthleteProfile
{
    public class GetAthleteProfileEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/api/user/athlete/profile", async (ClaimsPrincipal user, ISender sender) =>
            {
                var AspNetUser = user.FindFirstValue(ClaimTypes.NameIdentifier);

                if (string.IsNullOrEmpty(AspNetUser))
                {
                    return Results.Unauthorized();
                }

                var result = await sender.Send(new GetAthleteProfileQuery(AspNetUser));

                if (!result.Success)
                {
                    return Results.NotFound(result);
                }

                return Results.Ok(result);
            }).RequireAuthorization()
              .WithTags("User")
              .WithName("GetAthleteProfile");
        }
    }
}
