using MediatR;

namespace backend.Features.Donations.GetDonationsBySponsor
{
    public record GetDonationsQuery(string UserId) : IRequest<GetDonationsResponse>;

}
