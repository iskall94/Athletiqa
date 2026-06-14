using backend.Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Profiles.GetFeaturedAthletes;

public class GetFeaturedAthletesHandler(AthletiqaDbContext db)
    : IRequestHandler<GetFeaturedAthletesQuery, List<GetFeaturedAthletesResponse>>
{
    public async Task<List<GetFeaturedAthletesResponse>> Handle(
        GetFeaturedAthletesQuery request,
        CancellationToken cancellationToken)
    {
        return await db.AthleteProfile
            .AsNoTracking()
            .OrderByDescending(a => a.CreatedAt)
            .Take(10)
            .Select(a => new GetFeaturedAthletesResponse(
                a.PublicProfileId,
                a.User.AspNetUser.FirstName + " " + a.User.AspNetUser.LastName,
                a.Sport,
                a.PhotoUrl,
                (int)a.Gender
            ))
            .ToListAsync(cancellationToken);
    }
}