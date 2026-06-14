using backend.Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Donations.GetDonationsBySponsor
{
    public class GetDonationsHandler : IRequestHandler<GetDonationsQuery, GetDonationsResponse>
    {
        private readonly AthletiqaDbContext _context;

        public GetDonationsHandler(AthletiqaDbContext context)

            {
                _context = context;
            }

        public async Task<GetDonationsResponse> Handle(GetDonationsQuery request, CancellationToken cancellationToken)
        {
            var sponsorExist = await _context.SponsorProfile.AnyAsync(s => s.UserId == request.UserId, cancellationToken);

            if (!sponsorExist)
            {
                return new GetDonationsResponse
                {
                    Success = false,
                    ErrorMessage = "User not found"
                };
            }

            var donations = await _context.Donation.Where(d => d.SponsorId == request.UserId)
                                                   .OrderBy(d => d.CreatedAt)
                                                   .Select(d => new DonationItem 
                                                   { 
                                                        Amount = d.Amount,
                                                        CreatedAt = d.CreatedAt,
                                                        CampaignTitle = d.Campaign.Post.Title,
                                                        AthleteName = d.Campaign.Post.Athlete.User.AspNetUser.FirstName + " " + d.Campaign.Post.Athlete.User.AspNetUser.LastName,
                                                        Status = d.Status
                                                   })
                                                   .ToListAsync(cancellationToken);
            return new GetDonationsResponse
            {
                Success = true,
                DonationsCount = donations.Count,
                DonationsList = donations,
                
            };
           

        }
    }
}
