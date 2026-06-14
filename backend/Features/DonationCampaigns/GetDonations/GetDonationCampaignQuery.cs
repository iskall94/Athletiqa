using MediatR;

namespace backend.Features.DonationCampaigns.GetDonations;

public record GetDonationCampaignQuery(string? AthleteId = null) : IRequest<List<GetDonationCampaignResponse>>;