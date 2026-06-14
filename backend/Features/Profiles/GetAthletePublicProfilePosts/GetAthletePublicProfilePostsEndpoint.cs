using Carter;
using MediatR;

namespace backend.Features.Profiles.GetAthletePublicProfilePosts;

public class GetAthletePublicProfilePostsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/athletes/{publicProfileId:int}/posts", async (
            int publicProfileId,
            ISender sender,
            CancellationToken cancellationToken) =>
        {
            var posts = await sender.Send(
                new GetAthletePublicProfilePostsQuery(publicProfileId),
                cancellationToken);

            return Results.Ok(posts);
        });
    }
}
