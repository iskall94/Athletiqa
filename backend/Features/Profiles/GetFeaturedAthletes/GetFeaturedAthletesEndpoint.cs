using Carter;
using MediatR;

namespace backend.Features.Profiles.GetFeaturedAthletes;

public class GetFeaturedAthletesEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/athletes/featured", async (
            ISender sender,
            CancellationToken cancellationToken) =>
        {
            var result = await sender.Send(
                new GetFeaturedAthletesQuery(),
                cancellationToken);

            return Results.Ok(result);
        });
    }
}
