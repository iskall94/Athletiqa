namespace backend.Features.DonationCampaigns.CreateDonations;

public record CreateDonationCampaignMediaRequest(
    string Url,
    string? CloudinaryPublicId,
    string ResourceType
);