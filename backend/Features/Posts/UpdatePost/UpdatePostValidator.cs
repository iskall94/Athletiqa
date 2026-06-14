using FluentValidation;

namespace backend.Features.Posts.UpdatePost;

public class UpdatePostValidator : AbstractValidator<UpdatePostCommand>
{
	public UpdatePostValidator()
	{
		RuleFor(x => x.Title)
			.MaximumLength(100).WithMessage("Title is too long")
			.When(x => !string.IsNullOrEmpty(x.Title));

		RuleFor(x => x.Content)
			.MaximumLength(2000).WithMessage("Content is too long")
			.When(x => !string.IsNullOrEmpty(x.Content));

		RuleForEach(x => x.MediaUrls)
			.Must(uri => string.IsNullOrEmpty(uri) || Uri.TryCreate(uri, UriKind.Absolute, out _))
			.WithMessage("Each Media URL must be a valid link")
			.When(x => x.MediaUrls != null); 
	}
}