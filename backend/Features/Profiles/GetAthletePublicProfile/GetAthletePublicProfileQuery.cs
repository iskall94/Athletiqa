using MediatR;

namespace backend.Features.Profiles.GetAthletePublicProfile;

public record GetAthletePublicProfileQuery(int PublicProfileId)
    : IRequest<GetAthletePublicProfileResponse?>;
