namespace backend.Features.Posts.UpdatePost;

using backend.Domain.Entities;
using backend.Domain.Enums;
using backend.Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;

public class UpdatePostHandler(AthletiqaDbContext db) : IRequestHandler<UpdatePostCommand, IResult>
{
	public async Task<IResult> Handle(UpdatePostCommand request, CancellationToken cancellationToken)
	{
		var post = await db.Post
			.Include(p => p.MediaContents)
			.FirstOrDefaultAsync(p => p.PostId == request.PostId, cancellationToken);

		if (post is null)
			return Results.NotFound($"Post med id {request.PostId} hittas inte");

		// makes sure active user is same as creator of post
		if (request.ActiveUserId != post.CreatedBy)
		{
			return Results.Forbid();
		}
		
		// updates properties if user sent updating info i.e. the properties are not null
		if (request.Title != null)
			post.Title = request.Title;

		if (request.Content != null)
			post.Content = request.Content;

		if(request.MediaUrls != null)
		{
			// compare list of mediaUrls from request with existing media in the database
			// to find which images the user wants to remove (the ones NOT present in the request list)
			var mediaToRemove = post.MediaContents
				.Where(m => !request.MediaUrls.Contains(m.MediaUrl))
				.ToList();
			
				foreach (var media in mediaToRemove)
				post.MediaContents.Remove(media);

			// loop through requested URLs, skip empty strings, prevent duplicates
			// by checking if URL already exist before adding to the posts media collection
			foreach (var url in request.MediaUrls)
			{
				if (!string.IsNullOrWhiteSpace(url))
				{
					
					bool alreadyExists = post.MediaContents.Any(m => m.MediaUrl == url);
					if (!alreadyExists)
					{
						post.MediaContents.Add(new MediaContent
						{
							MediaUrl = url,
							MediaType = MediaType.Image
						});
					}
				}
			};
		};

		await db.SaveChangesAsync(cancellationToken);

		return Results.NoContent();
	}
}
