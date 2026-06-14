using backend.Domain.Entities;
using backend.Features.Auth;
using backend.Infrastructure.Database;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Settings.GetAthleteProfile
{
    public class GetAthleteProfileHandler : IRequestHandler<GetAthleteProfileQuery, GetAthleteProfileResponse>
    {
        private readonly AthletiqaDbContext _context;

        public GetAthleteProfileHandler(AthletiqaDbContext context)
        {
            _context = context;
        }


        public async Task<GetAthleteProfileResponse> Handle(GetAthleteProfileQuery request, CancellationToken cancellationToken)
        {
            var athleteProfile = await _context.AthleteProfile
                                               .Include(a => a.User)
                                                .ThenInclude(a => a.AspNetUser)
                                               .FirstOrDefaultAsync(a => a.UserId == request.UserId, cancellationToken);

            if (athleteProfile == null || athleteProfile.User == null || athleteProfile.User.AspNetUser == null)
            {
                return new GetAthleteProfileResponse
                {
                    Success = false,
                    ErrorMessage = "User not found"
                };
            }

            return new GetAthleteProfileResponse
            {
                Success = true,

                FirstName = athleteProfile.User.AspNetUser.FirstName,
                LastName = athleteProfile.User.AspNetUser.LastName,
                Email = athleteProfile.User.AspNetUser.Email,
                Bio = athleteProfile.Bio,
                Gender = athleteProfile.Gender,
                PhotoUrl = athleteProfile.PhotoUrl,
                PhotoPublicId = athleteProfile.PhotoPublicId,
            };
        }
    }
}
