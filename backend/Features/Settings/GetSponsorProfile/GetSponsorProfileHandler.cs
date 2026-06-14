using backend.Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Settings.GetSponsorProfile
{
    public class GetSponsorProfileHandler : IRequestHandler<GetSponsorProfileQuery, GetSponsorProfileResponse>
    {
        private readonly AthletiqaDbContext _context;

        public GetSponsorProfileHandler(AthletiqaDbContext context)
        {
            _context = context;
        }


        public async Task<GetSponsorProfileResponse> Handle(GetSponsorProfileQuery request, CancellationToken cancellationToken)
        {
            var sponsorProfile = await _context.SponsorProfile
                                               .Include(a => a.User)
                                                  .ThenInclude(a => a.AspNetUser)
                                               .FirstOrDefaultAsync(a => a.UserId == request.UserId, cancellationToken);

            if (sponsorProfile == null || sponsorProfile.User == null || sponsorProfile.User.AspNetUser == null)
            {
                return new GetSponsorProfileResponse
                {
                    Success = false,
                    ErrorMessage = "User not found"
                };
            }

            return new GetSponsorProfileResponse
            {
                Success = true,

                FirstName = sponsorProfile.User.AspNetUser.FirstName,
                LastName = sponsorProfile.User.AspNetUser.LastName,
                Email = sponsorProfile.User.AspNetUser.Email,
                Description = sponsorProfile.Description,
                PhotoUrl = sponsorProfile.PhotoUrl,
                PhotoPublicId = sponsorProfile.PhotoPublicId,
                CompanyName = sponsorProfile.Name,
                OrgNumber = sponsorProfile.OrganisationNumber
            };
        }
    }
}
