using Carter;
using MediatR;
using System.Security.Claims;

namespace backend.Features.DonationCampaigns.GetMyCampaigns
{
    public class GetMyCampaignsEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/api/campaigns/my",
            async (ClaimsPrincipal user, IMediator mediator) =>
            {
                var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

                if (string.IsNullOrEmpty(userId))
                    return Results.Unauthorized();

                var campaigns = await mediator.Send(
                    new GetMyCampaignsQuery(userId)
                );

                return Results.Ok(campaigns);
            })
            .RequireAuthorization();
        }
    }
}
