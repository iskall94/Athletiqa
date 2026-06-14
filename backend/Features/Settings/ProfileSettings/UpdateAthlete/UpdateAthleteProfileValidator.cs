using FluentValidation;

namespace backend.Features.Settings.ProfileSettings.UpdateAthlete
{
    public class UpdateAthleteProfileCommandValidator : AbstractValidator<UpdateAthleteProfileCommand>
    {
        public UpdateAthleteProfileCommandValidator()
        {
            RuleFor(x => x.FirstName)
               .MaximumLength(100)
               .When(x => x.FirstName is not null);

            RuleFor(x => x.LastName)
               .MaximumLength(100)
               .When(x => x.LastName is not null);

            RuleFor(x => x.Bio)
                .MaximumLength(500).When(x => !string.IsNullOrEmpty(x.Bio));

            RuleFor(x => x.Email)
                .EmailAddress().WithMessage("Email must be valid")
                .MaximumLength(256)
                .When(x => x.Email is not null);

            RuleFor(x => x.PhotoUrl)
                .MaximumLength(500)
                .When(x => x.PhotoUrl is not null);

            RuleFor(x => x.PhotoPublicId)
                .MaximumLength(500)
                .When(x => x.PhotoPublicId is not null);
        }
    }
}
