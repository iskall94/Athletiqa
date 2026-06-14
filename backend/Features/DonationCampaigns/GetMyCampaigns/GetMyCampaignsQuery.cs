using MediatR;

namespace backend.Features.DonationCampaigns.GetMyCampaigns
{
    public record GetMyCampaignsQuery(string UserId) : IRequest<List<GetMyCampaignsResponse>>;
}
