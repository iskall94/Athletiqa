using System.Security.Claims;
using backend.Domain.Entities;
using backend.Infrastructure.Database;
using Carter;
using MediatR;

namespace backend.Features.Posts.UpdatePost;

public class UpdatePostEndpoint : ICarterModule
{
	public void AddRoutes(IEndpointRouteBuilder app)
	{
		app.MapPut("/api/posts/{postId}", async (int postId, UpdatePostRequest request, HttpContext context, ISender mediator) =>
		{
			var activeUserId = context.User.FindFirstValue((ClaimTypes.NameIdentifier));

			var results = await mediator.Send(
				new UpdatePostCommand(
					postId,
					request.Title,
					request.Content,
					request.MediaUrls,
					activeUserId
				));
			return results;
		}).RequireAuthorization();
	}
}
 