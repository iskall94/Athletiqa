using backend.Features.Settings.ProfileSettings;
using FluentValidation;

namespace backend.Features.Settings.GuardianSettings
{
    public class UpdateGuardianSettingsValidator : AbstractValidator<UpdateGuardianSettingsCommand>
    {
        public UpdateGuardianSettingsValidator()
        {
            RuleFor(x => x.FirstName)
               .MaximumLength(100)
               .When(x => x.FirstName is not null);

            RuleFor(x => x.LastName)
               .MaximumLength(100)
               .When(x => x.LastName is not null);


            RuleFor(x => x.Email)
                .EmailAddress().WithMessage("Email must be valid")
                .MaximumLength(256)
                .When(x => x.Email is not null);

            RuleFor(x => x.PhoneNumber)
                .MaximumLength(20);
        }
    }
}
