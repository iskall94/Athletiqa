using backend.Features.Settings.GetAthleteProfile;
using backend.Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Settings.GetGuardian
{
    public class GetGuardianHandler : IRequestHandler<GetGuardianQuery, GetGuardianResponse>
    {
        private readonly AthletiqaDbContext _context;

        public GetGuardianHandler(AthletiqaDbContext context)
        {
            _context = context;
        }


        public async Task<GetGuardianResponse> Handle(GetGuardianQuery request, CancellationToken cancellationToken)
        {

            var guardian = await _context.AppUsers
                                         .Include(a => a.AspNetUser)
                                         .Include(a => a.AthleteProfile)
                                            .ThenInclude(a => a.Guardian)
                                         .FirstOrDefaultAsync(a => a.UserId == request.UserId, cancellationToken);



            if (guardian == null || guardian.AthleteProfile == null || guardian.AspNetUser == null || guardian.AthleteProfile.Guardian == null)
            {
                return new GetGuardianResponse
                {
                    Success = false,
                    ErrorMessage = "User not found"
                };
            }

            return new GetGuardianResponse
            {
                Success = true,

                FirstName = guardian.AthleteProfile.Guardian.FirstName,
                LastName = guardian.AthleteProfile.Guardian.LastName,
                Email = guardian.AthleteProfile.Guardian.Email,
                PhoneNumber = guardian.AthleteProfile.Guardian.PhoneNumber,
                Relationship = guardian.AthleteProfile.Guardian.Relationship
            };
        }
    }
}
