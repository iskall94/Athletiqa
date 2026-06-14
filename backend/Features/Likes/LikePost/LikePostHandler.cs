using backend.Domain.Entities;
using backend.Features.Notifications.SendLikeNotifications;
using backend.Infrastructure.Database;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Likes.LikePost
{
	public class LikePostHandler(AthletiqaDbContext db, IValidator<LikePostCommand> validator, IMediator mediator) : IRequestHandler<LikePostCommand, LikePostResponse>
	{
		public async Task<LikePostResponse> Handle(LikePostCommand request, CancellationToken cancellationToken)
		{
			var validationResult = await validator.ValidateAsync(request, cancellationToken);
			if (!validationResult.IsValid)
			{
				return new LikePostResponse
				{
					Success = false,
					Errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
				};
			}

			// Check if the post exists
			var postExists = await db.Post.AnyAsync(p => p.PostId == request.PostId, cancellationToken);


			if (!postExists)
			{
				return new LikePostResponse
				{
					Success = false,
					ErrorMessage = "Post not found."
				};
			}

			// Check if the user has already liked the post
			var alreadyLiked = await db.PostLike.AnyAsync(pl => pl.PostId == request.PostId && pl.UserId == request.UserId, cancellationToken);

			// If the user has already liked the post, return an error response
			if (alreadyLiked)
			{
				return new LikePostResponse
				{
					Success = false,
					IsLiked = true,
					PostId = request.PostId,
					Errors = ["You have already liked this post."]
				};	
			}
			// Create a new PostLike entity and save it to the database
			var postLike = new PostLike
			{
				PostId = request.PostId,
				UserId = request.UserId!,
				CreatedAt = DateTime.UtcNow
			};

			db.PostLike.Add(postLike);
			await db.SaveChangesAsync(cancellationToken);

			// Notification logic
			var post = await db.Post.FirstAsync(p => p.PostId == request.PostId, cancellationToken);

			if (post.AthleteId != request.UserId)
			{
				var likerUser = await db.Users
					.FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);

				if (likerUser != null)
				{
					string likerFullName = $"{likerUser.FirstName} {likerUser.LastName}";

					await mediator.Publish(new SendLikeNotificationEvent(
						PostOwnerId: post.AthleteId,
						LikerName: likerFullName,
						PostId: post.PostId
					), cancellationToken);
				}
			}

			// Get the updated like count for the post
			var likeCount = await db.PostLike.CountAsync(pl => pl.PostId == request.PostId, cancellationToken);


			return new LikePostResponse
			{
				Success = true,
				LikeCount = likeCount,
				IsLiked = true,
				PostId = request.PostId
			};
		}
	}
}
