using Carter;
using MediatR;
using System.Security.Claims;

namespace backend.Features.Posts.DeletePost;

public class DeletePostEndpoint : ICarterModule
{
	public void AddRoutes(IEndpointRouteBuilder app)
	{
		app.MapDelete("/api/posts/{postId}", async (int postId, HttpContext context, ISender mediator) =>
		{
			var activeUserId = context.User.FindFirstValue((ClaimTypes.NameIdentifier));
			var results = await mediator.Send(new DeletePostCommand(postId, activeUserId));
			return results;
		}).RequireAuthorization();
	}
}
