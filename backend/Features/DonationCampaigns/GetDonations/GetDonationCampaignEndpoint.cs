using Carter;
using MediatR;
using System.Security.Claims;

namespace backend.Features.DonationCampaigns.GetDonations;

public class GetDonationCampaignModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/donation-campaigns", async (ISender mediator) =>
        {
            var result = await mediator.Send(new GetDonationCampaignQuery());
            return Results.Ok(result);
        });

        app.MapGet("/api/users/me/donation-campaigns", async (ClaimsPrincipal user, ISender mediator) =>
        {
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Results.Unauthorized();
            }

            var result = await mediator.Send(new GetDonationCampaignQuery(userId));
            return Results.Ok(result);
        }).RequireAuthorization();
    }
}

