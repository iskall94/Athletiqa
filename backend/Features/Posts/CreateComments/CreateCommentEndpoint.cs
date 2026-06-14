using MediatR;
using System.Security.Claims;
using Carter;

namespace backend.Features.Posts.Comments;

public class CreateCommentModule : ICarterModule
{
	public void AddRoutes(IEndpointRouteBuilder app)
	{
		app.MapPost("/api/posts/{postId}/comments", async (int postId, CreateCommentRequest request, ISender mediator, ClaimsPrincipal user) =>
		{
			var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

			if (userId == null)
			{
				return Results.Unauthorized();
			}

			var command = new CreateCommentCommand
			(
				postId,
				userId,
				request.Content
			);

			var response = await mediator.Send(command);

			return Results.Ok(response);
		})
		.RequireAuthorization();
	}
}