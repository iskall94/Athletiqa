using backend.Domain.Entities;
using backend.Domain.Enums;
using backend.Infrastructure.Database;
using MediatR;
using FluentValidation;

namespace backend.Features.DonationCampaigns.CreateDonations;

public class CreateDonationCampaignHandler(AthletiqaDbContext db, IValidator<CreateDonationCampaignCommand> validator)
	: IRequestHandler<CreateDonationCampaignCommand, int>
{
	public async Task<int> Handle(CreateDonationCampaignCommand command, CancellationToken cancellationToken)
	{
		var validationResult = await validator.ValidateAsync(command, cancellationToken);

		if (!validationResult.IsValid)
		{
            throw new ValidationException(validationResult.Errors);
        }

		var post = new Post
		{
			Title = command.Title,
			Content = command.Content,
			AthleteId = command.UserId,
			CreatedBy = command.UserId,
			MediaContents = 
			[
				new MediaContent 
				{
					MediaUrl = command.Media.Url,
					CloudinaryPublicId = command.Media.CloudinaryPublicId,
					MediaType = ToMediaType(command.Media.ResourceType)
				}
			]
		};

		post.DonationCampaign = new DonationCampaign
		{
			GoalAmount = command.GoalAmount,
			CurrentAmount = 0
		};
		db.Post.Add(post);
		await db.SaveChangesAsync(cancellationToken);
		return post.DonationCampaign!.DonationCampaignId;
	}

	private static MediaType ToMediaType(string resourceType)
	{
		return resourceType.Equals("video", StringComparison.OrdinalIgnoreCase)
			? MediaType.Video
			: MediaType.Image;
	}
}