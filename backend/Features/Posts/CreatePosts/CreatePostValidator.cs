using FluentValidation;

namespace backend.Features.Posts.CreatePosts;

public class CreatePostValidator : AbstractValidator<CreatePostCommand>
{
	public CreatePostValidator()
	{
		RuleFor(x => x.Title)
			.NotEmpty().WithMessage("Title cannot be empty")
			.MaximumLength(100).WithMessage("Title is too long");

		RuleFor(x => x.Content)
			.NotEmpty().WithMessage("Content is required")
			.MaximumLength(2000).WithMessage("Content is too long");

		RuleForEach(x => x.Media)
			.ChildRules(media =>
			{
				media.RuleFor(x => x.Url)
					.Must(url => string.IsNullOrWhiteSpace(url) || Uri.TryCreate(url, UriKind.Absolute, out _))
					.WithMessage("Each media URL must be a valid link");

				media.RuleFor(x => x.CloudinaryPublicId)
					.MaximumLength(500)
					.When(x => x.CloudinaryPublicId is not null);

				media.RuleFor(x => x.ResourceType)
					.NotEmpty()
					.Must(resourceType => resourceType is "image" or "video")
					.WithMessage("Media resource type must be image or video");
			})
			.When(x => x.Media != null);
	}
}
