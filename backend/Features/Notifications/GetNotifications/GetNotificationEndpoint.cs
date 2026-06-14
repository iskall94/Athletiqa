using MediatR;
using System.Security.Claims;
using Carter;

namespace backend.Features.Notifications.GetNotifications;

public class GetNotificationEndpoint : ICarterModule
{
	public void AddRoutes(IEndpointRouteBuilder app)
	{
		app.MapGet("api/notifications", async (IMediator mediator, ClaimsPrincipal user) =>
		{
			var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
			if (string.IsNullOrEmpty(userId))
			{
				return Results.Unauthorized();
			}

			var result = await mediator.Send(new Query(userId));
			return Results.Ok(result);
		})
		.RequireAuthorization();
	}
}