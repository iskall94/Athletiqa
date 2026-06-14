using MediatR;

namespace backend.Features.DonationCampaigns.CreateDonations;

public record CreateDonationCampaignCommand(
	string UserId, 
	string Title, 
	string Content, 
	decimal GoalAmount, 
	CreateDonationCampaignMediaRequest Media
) : IRequest<int>;