using Carter;
using MediatR;

namespace backend.Features.Profiles.GetAthletePublicProfileCampaigns;

public class GetAthletePublicProfileCampaignsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/athletes/{publicProfileId:int}/campaigns", async (
            int publicProfileId,
            ISender sender,
            CancellationToken cancellationToken) =>
        {
            var campaigns = await sender.Send(
                new GetAthletePublicProfileCampaignsQuery(publicProfileId),
                cancellationToken);

            return Results.Ok(campaigns);
        });
    }
}
