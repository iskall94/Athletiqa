using backend.Domain.Entities;
using backend.Domain.Enums;
using backend.Infrastructure.Database;
using MediatR;
using FluentValidation;


namespace backend.Features.Posts.CreatePosts;

// Handler for creating a new post. It uses a transaction to ensure that the post is created atomically, and rolls back if any errors occur.
public class CreatePostHandler(AthletiqaDbContext db, IValidator<CreatePostCommand> validator)
	: IRequestHandler<CreatePostCommand, int>
{
	public async Task<int> Handle(CreatePostCommand command, CancellationToken cancellationToken)
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
			MediaContents = [] 
		};

		// Adds uploaded media to the post, each item carries its own Cloudinary metadata.
		if (command.Media != null)
		{
			foreach (var media in command.Media)
			{
				if (string.IsNullOrWhiteSpace(media.Url)) // ignores empty urls
				{
					continue;
				}

				post.MediaContents.Add(new MediaContent
				{
					MediaUrl = media.Url,
					CloudinaryPublicId = media.CloudinaryPublicId,
					MediaType = ToMediaType(media.ResourceType)
				});
			}
		}

		db.Post.Add(post);
		await db.SaveChangesAsync(cancellationToken);
		return post.PostId;
	}

	/// <summary>Saves videos as MediaType.Video instead of always MediaType.Image</summary>
    private static MediaType ToMediaType(string resourceType)
    {
        return resourceType.Equals("video", StringComparison.OrdinalIgnoreCase)
            ? MediaType.Video
            : MediaType.Image;
    }
}