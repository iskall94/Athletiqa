using backend.Infrastructure.Database;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Settings.ProfileSettings.UpdateAthlete
{
    public class UpdateAthleteProfileHandler : IRequestHandler<UpdateAthleteProfileCommand, UpdateAthleteProfileResponse>
    {
        private readonly AthletiqaDbContext _context;
        private readonly IValidator<UpdateAthleteProfileCommand> _validator;


        public UpdateAthleteProfileHandler
            (
            AthletiqaDbContext context,
            IValidator<UpdateAthleteProfileCommand> validator
            )

        {
            _context = context;
            _validator = validator;
        }

        public async Task<UpdateAthleteProfileResponse> Handle(UpdateAthleteProfileCommand request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid)
            {
                return new UpdateAthleteProfileResponse
                {
                    Success = false,
                    Errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }

            var athlete = await _context.AppUsers
                                        .Include(a => a.AspNetUser)
                                        .Include(a => a.AthleteProfile)
                                        .FirstOrDefaultAsync(a => a.UserId == request.UserId, cancellationToken);

            if (athlete == null || athlete.AspNetUser == null || athlete.AthleteProfile == null)
            {
                return new UpdateAthleteProfileResponse
                {
                    Success = false,
                    ErrorMessage = "User not found"
                };
            }

            if (!string.IsNullOrEmpty(request.FirstName)) athlete.AspNetUser.FirstName = request.FirstName;
            if (!string.IsNullOrEmpty(request.LastName)) athlete.AspNetUser.LastName = request.LastName;

            //allows Bio and DreamGoal to be empty
            if (request.Bio != null)
            {
                athlete.AthleteProfile.Bio = request.Bio;
            }


            if (request.Gender.HasValue)
            { 
                athlete.AthleteProfile.Gender = request.Gender.Value;
            
            }

            if (!string.IsNullOrEmpty(request.Email))
            { 
                athlete.AspNetUser.Email = request.Email;
                athlete.AspNetUser.NormalizedEmail = request.Email.ToUpperInvariant();

                //userName for Identity
                athlete.AspNetUser.UserName = request.Email; 
                athlete.AspNetUser.NormalizedUserName = request.Email.ToUpperInvariant();
            }

            if (request.PhotoUrl != null)
            {
                athlete.AthleteProfile.PhotoUrl = request.PhotoUrl;
            }

            if (request.PhotoPublicId != null)
            {
                athlete.AthleteProfile.PhotoPublicId = request.PhotoPublicId;
            }

            await _context.SaveChangesAsync(cancellationToken);

            return new UpdateAthleteProfileResponse
            {
                Success = true
            };

        }
    }
}
