namespace backend.Features.Profiles.GetSponsorPublicProfileDonations;

public record GetSponsorPublicProfileDonationResponse(
    int DonationId,
    int CampaignId,
    int AthletePublicProfileId,
    string CampaignTitle,
    string CampaignContent,
    decimal CampaignGoalAmount,
    decimal CampaignCurrentAmount,
    string? CampaignMediaUrl,
    string? CampaignMediaResourceType,
    decimal Amount,
    DateTime CreatedAt,
    string AthleteName,
    string? AthletePhotoUrl,
    int AthleteGender
);
