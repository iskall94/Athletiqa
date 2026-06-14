using backend.Features.DonationCampaigns.GetDonations;
using backend.Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Profiles.GetAthletePublicProfileCampaigns;

public class GetAthletePublicProfileCampaignsHandler(AthletiqaDbContext db)
    : IRequestHandler<GetAthletePublicProfileCampaignsQuery, List<GetDonationCampaignResponse>>
{
    public async Task<List<GetDonationCampaignResponse>> Handle(
        GetAthletePublicProfileCampaignsQuery request,
        CancellationToken cancellationToken)
    {
        return await db.DonationCampaign
            .AsNoTracking()
            .Where(d => d.Post.Athlete.PublicProfileId == request.PublicProfileId)
            .OrderByDescending(d => d.Post.CreatedAt)
            .Select(d => new GetDonationCampaignResponse(
                d.DonationCampaignId,
                d.Post.Athlete.PublicProfileId,
                d.Post.Title,
                d.Post.Content,
                d.GoalAmount,
                d.CurrentAmount,
                d.Post.MediaContents.Select(m => m.MediaUrl).FirstOrDefault(),
                d.Post.Athlete.User.AspNetUser.FirstName + " " + d.Post.Athlete.User.AspNetUser.LastName,
                d.Post.Athlete.PhotoUrl,
                (int)d.Post.Athlete.Gender,
                d.Post.CreatedAt
            ))
            .ToListAsync(cancellationToken);
    }
}
