using MediatR;

namespace backend.Features.Profiles.GetFeaturedAthletes;

public record GetFeaturedAthletesQuery : IRequest<List<GetFeaturedAthletesResponse>>;
