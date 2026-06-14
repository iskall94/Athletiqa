using MediatR;

namespace backend.Features.Profiles.GetSponsorPublicProfile;

public record GetSponsorPublicProfileQuery(int PublicProfileId)
    : IRequest<GetSponsorPublicProfileResponse?>;
