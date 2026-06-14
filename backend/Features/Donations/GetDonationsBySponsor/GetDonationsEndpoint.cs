using Carter;
using MediatR;
using System.Security.Claims;

namespace backend.Features.Donations.GetDonationsBySponsor
{
    public class GetDonationsEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/api/sponsors/donations", async (ClaimsPrincipal user, ISender sender) =>
            {
                var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

                if (string.IsNullOrWhiteSpace(userId))
                    return Results.Unauthorized();

                var result = await sender.Send(new GetDonationsQuery(userId));

                if (!result.Success)
                {
                    return Results.BadRequest(result);
                }

                return Results.Ok(result);
            }).RequireAuthorization();
        }
    }

}


