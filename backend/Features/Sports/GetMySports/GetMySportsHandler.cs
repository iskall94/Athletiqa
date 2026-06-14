using backend.Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Sports.GetMySports;

public class GetMySportsHandler(AthletiqaDbContext db) : IRequestHandler<GetMySportsQuery, GetMySportsResponse?>
{
    public async Task<GetMySportsResponse?> Handle(GetMySportsQuery request, CancellationToken cancellationToken)
    {
        var isAthlete = await db.AthleteProfile
            .AnyAsync(a => a.UserId == request.UserId, cancellationToken);

        if (!isAthlete)
            return null;

        var sports = await db.AthleteSport
            .Where(x => x.AthleteId == request.UserId)
            .OrderBy(x => x.Sport.SportId)
            .Select(x => x.Sport.Name)
            .ToListAsync(cancellationToken);

        return new GetMySportsResponse(sports);
    }
}
