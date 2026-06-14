using Carter;
using backend.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using MediatR;

namespace backend.Features.Posts.Comments;

public class GetCommentModule : ICarterModule
{
	public void AddRoutes(IEndpointRouteBuilder app)
	{
		app.MapGet("/api/posts/{postId}/comments", async (int postId, ISender mediator) =>
		{
			var query = new GetCommentQuery(postId);
			var comments = await mediator.Send(query);
			return Results.Ok(comments);
        });
	}
}