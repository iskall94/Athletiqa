using backend.Features.Settings.ProfileSettings;
using backend.Infrastructure.Database;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Settings.GuardianSettings
{
    public class UpdateGuardianSettingsHandler : IRequestHandler<UpdateGuardianSettingsCommand, UpdateGuardianSettingsResponse>
    {
        private readonly AthletiqaDbContext _context;
        private readonly IValidator<UpdateGuardianSettingsCommand> _validator;
        public UpdateGuardianSettingsHandler
            (
            AthletiqaDbContext context,
            IValidator<UpdateGuardianSettingsCommand> validator
            )

        {
            _context = context;
            _validator = validator;
        }
        public async Task<UpdateGuardianSettingsResponse> Handle(UpdateGuardianSettingsCommand request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid)
            {
                return new UpdateGuardianSettingsResponse
                {
                    Success = false,
                    Errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }

            var guardian = await _context.AppUsers
                                         .Include(a => a.AspNetUser)
                                         .Include(a => a.AthleteProfile)
                                            .ThenInclude(a => a.Guardian)
                                         .FirstOrDefaultAsync(a => a.UserId == request.UserId, cancellationToken);

            if (!string.IsNullOrEmpty(request.FirstName)) guardian.AthleteProfile.Guardian.FirstName = request.FirstName;
            if (!string.IsNullOrEmpty(request.LastName)) guardian.AthleteProfile.Guardian.LastName = request.LastName;


            if (!string.IsNullOrEmpty(request.Email)) guardian.AthleteProfile.Guardian.Email = request.Email;
            if (!string.IsNullOrEmpty(request.PhoneNumber)) guardian.AthleteProfile.Guardian.PhoneNumber = request.PhoneNumber;

            if (request.Relationship.HasValue) guardian.AthleteProfile.Guardian.Relationship = request.Relationship.Value;

            await _context.SaveChangesAsync(cancellationToken);

            return new UpdateGuardianSettingsResponse
            {
                Success = true
            };

        }
    }
}
