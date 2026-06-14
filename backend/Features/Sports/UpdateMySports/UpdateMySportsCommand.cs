using MediatR;

namespace backend.Features.Sports.UpdateMySports;

public record UpdateMySportsCommand(string UserId, List<string> Sports) : IRequest<UpdateMySportsResult>;

public enum UpdateMySportsResult
{
    Success,
    NotAthlete,
    InvalidSports
}