using MediatR;

namespace backend.Features.Sports.GetMySports;

public record GetMySportsQuery(string UserId) : IRequest<GetMySportsResponse?>;
