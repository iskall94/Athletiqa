using Carter;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace backend.Features.Posts.GetPostById;

public class GetPostByIdEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/posts/{postId}", async (int postId, ISender mediator) =>
        {
            var result = await mediator.Send(new GetPostByIdQuery(postId));
            return result;
        });
    }
}