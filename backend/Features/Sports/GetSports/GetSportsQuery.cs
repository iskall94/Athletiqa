using MediatR;

namespace backend.Features.Sports.GetSports;

public record GetSportsQuery : IRequest<List<SportResponse>>;