namespace backend.Features.DonationCampaigns.CreateDonations;

public record CreateDonationCampaignRequest(
    string Title,
    string Content,
    decimal GoalAmount,
    CreateDonationCampaignMediaRequest Media
);