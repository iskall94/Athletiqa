using backend.Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.DonationCampaigns.GetMyCampaigns
{
    public class MyCampaignsHandler
    : IRequestHandler<GetMyCampaignsQuery, List<GetMyCampaignsResponse>>
    {
        private readonly AthletiqaDbContext _context;

        public MyCampaignsHandler(AthletiqaDbContext context)
        {
            _context = context;
        }

        public async Task<List<GetMyCampaignsResponse>> Handle(GetMyCampaignsQuery request, CancellationToken cancellationToken)
        {

            var userAccount = await _context.AppUsers
                .Include(u => u.AspNetUser)
                .FirstOrDefaultAsync(u => u.UserId == request.UserId, cancellationToken);

            if (userAccount == null)
            {
                return new List<GetMyCampaignsResponse>();
            }


            return await _context.DonationCampaign
                                .Where(d => d.Post.Creator.UserId == request.UserId)
                                .Select(d => new GetMyCampaignsResponse
                                {
                                    Title = d.Post.Title,
                                    CurrentAmount = d.CurrentAmount,
                                    GoalAmount = d.GoalAmount,
                                    MediaUrl = d.Post.MediaContents.Select(m => m.MediaUrl).FirstOrDefault(),
                                    CreatedAt = d.Post.CreatedAt,
                                    DonationCount = d.Donations.Count,
                                    AverageDonationAmount = d.Donations.Any() ? d.Donations.Average(x => x.Amount) : 0
                                })
                                .ToListAsync(cancellationToken);
        }
    }
}
