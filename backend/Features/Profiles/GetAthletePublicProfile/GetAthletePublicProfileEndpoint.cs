using Carter;
using MediatR;

namespace backend.Features.Profiles.GetAthletePublicProfile;

public class GetAthletePublicProfileEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/athletes/{publicProfileId:int}", async (
            int publicProfileId,
            ISender sender,
            CancellationToken cancellationToken) =>
        {
            var result = await sender.Send(
                new GetAthletePublicProfileQuery(publicProfileId),
                cancellationToken);

            return result is null
                ? Results.NotFound()
                : Results.Ok(result);
        });
    }
}
