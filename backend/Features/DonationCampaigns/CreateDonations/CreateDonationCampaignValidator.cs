using FluentValidation;

namespace backend.Features.DonationCampaigns.CreateDonations;

public class CreateDonationCampaignValidator : AbstractValidator<CreateDonationCampaignCommand>
{
	public CreateDonationCampaignValidator()
	{
		RuleFor(x => x.Title)
			.NotEmpty().WithMessage("Title is required")
			.MaximumLength(100);

		RuleFor(x => x.Content)
			.NotEmpty().WithMessage("Content is required")
			.MinimumLength(20).WithMessage("Tell us a bit more about your cause!");

		RuleFor(x => x.GoalAmount)
			.GreaterThan(0).WithMessage("Goal must be a positive number");

		RuleFor(x => x.Media)
			.NotNull()
			.WithMessage("Media is required");

		RuleFor(x => x.Media.Url)
			.NotEmpty()
			.Must(uri => Uri.TryCreate(uri, UriKind.Absolute, out _))
			.WithMessage("A valid media URL is required")
			.When(x => x.Media is not null);

		RuleFor(x => x.Media.CloudinaryPublicId)
			.MaximumLength(500)
			.When(x => x.Media?.CloudinaryPublicId is not null);

		RuleFor(x => x.Media.ResourceType)
			.NotEmpty()
			.Must(resourceType => resourceType is "image" or "video")
			.WithMessage("Media resource type must be image or video")
			.When(x => x.Media is not null);
	}
}