using MediatR;

namespace backend.Features.Donations
{
    public record GetDonationsQuery (int campaignId) : IRequest<List<GetDonationsResponse>>;

}
