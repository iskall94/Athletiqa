using Carter;
using MediatR;
using System.Security.Claims;

namespace backend.Features.Notifications.MarkAsRead;

public class MarkAsRead : ICarterModule
{
	public void AddRoutes(IEndpointRouteBuilder app)
	{
		app.MapPut("api/notification/{id:guid}/read", async (Guid id, IMediator mediator, ClaimsPrincipal user) =>
		{
			var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

			if (string.IsNullOrEmpty(userId))
			{
				return Results.Unauthorized();
			}

			var found = await mediator.Send(new MarkAsReadCommand(id, userId));
			return found ? Results.NoContent() : Results.NotFound();
		})
		.RequireAuthorization();
	}
}