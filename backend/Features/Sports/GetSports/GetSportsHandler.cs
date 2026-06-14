using backend.Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Sports.GetSports;

public class GetSportsHandler(AthletiqaDbContext db) : IRequestHandler<GetSportsQuery, List<SportResponse>>
{
    public async Task<List<SportResponse>> Handle(GetSportsQuery request, CancellationToken cancellationToken)
    {
        return await db.Sport
            .OrderBy(s => s.SportId)
            .Select(s => new SportResponse(s.SportId, s.Name))
            .ToListAsync(cancellationToken);
    }
}
