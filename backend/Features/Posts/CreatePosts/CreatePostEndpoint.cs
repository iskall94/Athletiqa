using Carter;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using backend.Infrastructure.Database;


namespace backend.Features.Posts.CreatePosts;

// Module that defines the route for creating a new post. It requires authorization and extracts the user ID from the claims to associate the post with the correct user.
public class CreatePostModule : ICarterModule
{
	public void AddRoutes(IEndpointRouteBuilder app)
	{
		app.MapPost("/api/posts", async (CreatePostRequest request, ClaimsPrincipal user, AthletiqaDbContext db, ISender mediator) =>
		{
			var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
			{
				return Results.Unauthorized();
			}

			var isAthlete = await db.AthleteProfile.AnyAsync(a => a.UserId == userId);
			if (!isAthlete)
			{
				return Results.Json(new { message = "Only athletes can create posts." }, statusCode: StatusCodes.Status403Forbidden);
			}

			var id = await mediator.Send(new CreatePostCommand(
					userId,
					request.Title,
					request.Content,
					request.Media));

			return Results.Created($"/api/posts/{id}", new { postId = id });
		})
		.RequireAuthorization();
	}
}