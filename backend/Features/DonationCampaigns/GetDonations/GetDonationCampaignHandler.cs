using backend.Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.DonationCampaigns.GetDonations;

public class GetDonationCampaignHandler(AthletiqaDbContext db) : IRequestHandler<GetDonationCampaignQuery, List<GetDonationCampaignResponse>>
{
    public async Task<List<GetDonationCampaignResponse>> Handle(GetDonationCampaignQuery request, CancellationToken cancellationToken)
    {
        // Retrieve all donation campaigns from the database,
        // including related post and athlete information, and project them into a list of GetDonationResponse objects.

        var query = db.DonationCampaign
            .AsNoTracking()
            .Include(d => d.Post)
            .ThenInclude(p => p.Athlete.User)
            .AsQueryable();
        if (!string.IsNullOrWhiteSpace(request.AthleteId))
        {
            query = query.Where(d => d.Post.AthleteId == request.AthleteId);
        }

		return await query
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
                d.Post.CreatedAt))
            .ToListAsync(cancellationToken);
    }
}
