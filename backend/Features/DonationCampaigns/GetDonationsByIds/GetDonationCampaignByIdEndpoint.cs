using Carter;
using MediatR;

namespace backend.Features.DonationCampaigns.GetDonationsByIds;

public class GetDonationCampaignByIdModule : ICarterModule
{
	public void AddRoutes(IEndpointRouteBuilder app)
	{
		app.MapGet("/api/donation-campaigns/{id:int}", async (int id, ISender mediator) =>
		{
			var result = await mediator.Send(new GetDonationCampaignByIdQuery(id));
			return result is not null ? Results.Ok(result) : Results.NotFound();
		});
	}
}