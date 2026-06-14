using MediatR;

namespace backend.Features.Profiles.GetSponsorPublicProfileDonations;

public record GetSponsorPublicProfileDonationsQuery(
    int? PublicProfileId = null,
    string? SponsorId = null
) : IRequest<List<GetSponsorPublicProfileDonationResponse>>;
