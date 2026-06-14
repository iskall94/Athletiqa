using backend.Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Profiles.GetAthletePublicProfile;

public class GetAthletePublicProfileHandler(AthletiqaDbContext db)
    : IRequestHandler<GetAthletePublicProfileQuery, GetAthletePublicProfileResponse?>
{
    public async Task<GetAthletePublicProfileResponse?> Handle(
        GetAthletePublicProfileQuery request,
        CancellationToken cancellationToken)
    {
        return await db.AthleteProfile
            .AsNoTracking()
            .Where(a => a.PublicProfileId == request.PublicProfileId)
            .Select(a => new GetAthletePublicProfileResponse(
                a.PublicProfileId,
                a.User.AspNetUser.FirstName + " " + a.User.AspNetUser.LastName,
                a.Bio,
                a.PhotoUrl,
                (int)a.Gender,
                a.Sports
                    .Select(athleteSport => athleteSport.Sport.Name)
                    .ToList()
            ))
            .FirstOrDefaultAsync(cancellationToken);
    }
}
