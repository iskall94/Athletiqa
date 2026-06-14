using backend.Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Profiles.GetSponsorPublicProfile;

public class GetSponsorPublicProfileHandler(AthletiqaDbContext db)
    : IRequestHandler<GetSponsorPublicProfileQuery, GetSponsorPublicProfileResponse?>
{
    public async Task<GetSponsorPublicProfileResponse?> Handle(
        GetSponsorPublicProfileQuery request,
        CancellationToken cancellationToken)
    {
        return await db.SponsorProfile
            .AsNoTracking()
            .Where(s => s.PublicProfileId == request.PublicProfileId)
            .Select(s => new GetSponsorPublicProfileResponse(
                s.PublicProfileId,
                s.Name,
                s.Description,
                s.PhotoUrl
            ))
            .FirstOrDefaultAsync(cancellationToken);
    }
}
