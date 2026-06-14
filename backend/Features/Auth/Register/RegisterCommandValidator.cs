using FluentValidation;
using backend.Shared.Helpers;
using backend.Domain.Enums;

namespace backend.Features.Auth.Register;

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        // BASIC INFO - Required for all users
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Email must be valid")
            .MaximumLength(256);

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required")
            .MinimumLength(8).WithMessage("Password must be at least 8 characters")
            .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter")
            .Matches(@"[a-z]").WithMessage("Password must contain at least one lowercase letter")
            .Matches(@"[0-9]").WithMessage("Password must contain at least one number")
            .Matches(@"[^a-zA-Z0-9]").WithMessage("Password must contain at least one special character");

        RuleFor(x => x.PersonalIdNumber)
            .NotEmpty().WithMessage("Personal ID number is required")
            .Must(PersonNumberHelper.IsValid)
            .WithMessage("Personal ID number is invalid (format: YYYYMMDD-XXXX)");

        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("First name is required")
            .MaximumLength(100);

        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("Last name is required")
            .MaximumLength(100);

        RuleFor(x => x.UserType)
            .NotEmpty().WithMessage("User type is required")
            .IsInEnum().WithMessage("Invalid user type");

        When(x => !PersonNumberHelper.IsMinor(x.PersonalIdNumber), () =>
        {
            RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("Phone number is required")
            .MaximumLength(20);
        });

        // ATHLETE-SPECIFIC VALIDATION
        When(x => x.UserType.IsAthlete(), () =>
        {
            RuleFor(x => x.Gender)
                .NotNull().WithMessage("Gender is required for athletes")
                .IsInEnum().WithMessage("Invalid gender");

            RuleFor(x => x.Sport)
                //.NotEmpty().WithMessage("Sport is required for athletes")
                .MaximumLength(100);

            RuleFor(x => x.Bio)
                .MaximumLength(500).When(x => !string.IsNullOrEmpty(x.Bio));

            RuleFor(x => x.DreamGoal)
                .MaximumLength(500).When(x => !string.IsNullOrEmpty(x.DreamGoal));
        });

        // SPONSOR-SPECIFIC VALIDATION
        When(x => x.UserType.IsSponsor(), () =>
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Company/Organization name is required for sponsors")
                .MaximumLength(200);

            RuleFor(x => x.OrganisationNumber)
                .NotEmpty().WithMessage("Organisation number is required for sponsors")
                .MaximumLength(20);

            RuleFor(x => x.SponsorTypeId)
                .NotNull().WithMessage("Sponsor type is required for sponsors")
                .IsInEnum().WithMessage("Invalid sponsor type");

            RuleFor(x => x.Description)
                .MaximumLength(500).When(x => !string.IsNullOrEmpty(x.Description));
        });

        // MINOR VALIDATION - Guardian required if under 18
        When(x => x.PersonalIdNumber.IsMinor(), () =>
        {
            RuleFor(x => x.Guardian)
                .NotNull().WithMessage("Guardian information is required for users under 18 years old");
        });

        When(x => x.PersonalIdNumber.IsMinor() && x.Guardian != null, () =>
        {
            RuleFor(x => x.Guardian!.FirstName)
                .NotEmpty().WithMessage("Guardian first name is required")
                .MaximumLength(100);

            RuleFor(x => x.Guardian!.LastName)
                .NotEmpty().WithMessage("Guardian last name is required")
                .MaximumLength(100);

            RuleFor(x => x.Guardian!.Email)
                .NotEmpty().WithMessage("Guardian email is required")
                .EmailAddress().WithMessage("Guardian email must be valid")
                .MaximumLength(256);

            RuleFor(x => x.Guardian!.PhoneNumber)
                .NotEmpty().WithMessage("Guardian phone number is required")
                .MaximumLength(20);

            RuleFor(x => x.Guardian!.Relationship)
                .IsInEnum().WithMessage("Invalid guardian relationship");

            RuleFor(x => x.Guardian!.PersonalIdNumber)
                .NotEmpty().WithMessage("Guardian personal ID number is required")
                .Must(PersonNumberHelper.IsValid)
                .WithMessage("Guardian personal ID number is invalid");
        });

        // ADULT VALIDATION - Ensure sponsor users are adults
        When(x => x.UserType.IsSponsor(), () =>
        {
            RuleFor(x => x.PersonalIdNumber)
                .Must(pid => PersonNumberHelper.IsAdult(pid))
                .WithMessage("Sponsors must be 18 years or older");
        });
    }
}