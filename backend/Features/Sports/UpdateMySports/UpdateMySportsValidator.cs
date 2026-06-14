using FluentValidation;

namespace backend.Features.Sports.UpdateMySports;

public class UpdateMySportsValidator : AbstractValidator<UpdateMySportsCommand>
{
    public UpdateMySportsValidator()
    {
        RuleFor(x => x.Sports)
            .NotNull()
            .Must(Sports => Sports.Count <= 5)
            .WithMessage("You can select up to 5 sports.");

        RuleForEach(x => x.Sports)
            .NotEmpty()
            .MaximumLength(100);
    }
}
