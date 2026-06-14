using FluentValidation;

namespace backend.Features.Settings.ProfileSettings.UpdateSponsor
{
    public class UpdateSponsorProfileValidator : AbstractValidator<UpdateSponsorProfileCommand>
    {
        public UpdateSponsorProfileValidator()
        {
            RuleFor(x => x.FirstName)
               .MaximumLength(100)
               .When(x => x.FirstName is not null);

            RuleFor(x => x.LastName)
               .MaximumLength(100)
               .When(x => x.LastName is not null);


            RuleFor(x => x.Description)
                .MaximumLength(500).When(x => !string.IsNullOrEmpty(x.Description));


            RuleFor(x => x.Email)
                .EmailAddress().WithMessage("Email must be valid")
                .MaximumLength(256)
                .When(x => x.Email is not null);

            RuleFor(x => x.CompanyName)
                .MaximumLength(200);

            RuleFor(x => x.OrgNumber)
                .MaximumLength(20);

            RuleFor(x => x.PhotoUrl)
                .MaximumLength(500)
                .When(x => x.PhotoUrl is not null);

            RuleFor(x => x.PhotoPublicId)
                .MaximumLength(500)
                .When(x => x.PhotoPublicId is not null);
        }
    }
}
