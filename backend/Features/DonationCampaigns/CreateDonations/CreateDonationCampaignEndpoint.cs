using Carter;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using backend.Infrastructure.Database;

namespace backend.Features.DonationCampaigns.CreateDonations;

public class CreateDonationCampaignModule : ICarterModule
{
	public void AddRoutes(IEndpointRouteBuilder app)
	{
		app.MapPost("/api/donation-campaigns", async (CreateDonationCampaignRequest request, ClaimsPrincipal user, AthletiqaDbContext db, ISender mediator) =>
		{
			var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);
			if (string.IsNullOrWhiteSpace(userId))
			{
				return Results.Unauthorized();
			}

			var isAthlete = await db.AthleteProfile.AnyAsync(a => a.UserId == userId);
			if (!isAthlete)
			{
				return Results.Json(new { message = "Only athletes can create donation campaigns." }, statusCode: StatusCodes.Status403Forbidden);
			}

			var now = DateTime.UtcNow;
			var hasActiveCampaign = await db.DonationCampaign
				.AnyAsync(c =>
					c.Post.AthleteId == userId &&
					c.CurrentAmount < c.GoalAmount &&
					(c.Deadline == null || c.Deadline > now));

			if (hasActiveCampaign)
			{
				return Results.Conflict(new { message = "Athlete already has an active donation campaign." });
			}

			var id = await mediator.Send(new CreateDonationCampaignCommand(
				userId,
				request.Title,
				request.Content,
				request.GoalAmount,
				request.Media
			));

			return Results.Created($"/api/donation-campaigns/{id}", new { donationCampaignId = id });
		}).RequireAuthorization();
	}
}
