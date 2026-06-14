using backend.Features.DonationCampaigns.GetDonations;
using MediatR;

namespace backend.Features.DonationCampaigns.GetDonationsByIds;

public record GetDonationCampaignByIdQuery(int Id) : IRequest<GetDonationCampaignResponse?>;