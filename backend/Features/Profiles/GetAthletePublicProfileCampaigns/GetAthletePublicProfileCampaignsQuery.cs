using backend.Features.DonationCampaigns.GetDonations;
using MediatR;

namespace backend.Features.Profiles.GetAthletePublicProfileCampaigns;

public record GetAthletePublicProfileCampaignsQuery(int PublicProfileId)
    : IRequest<List<GetDonationCampaignResponse>>;
