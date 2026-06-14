using backend.Infrastructure.Database;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using backend.Domain.Entities;

namespace backend.Features.Likes.UnlikePost
{
	public class UnlikePostHandler : IRequestHandler<UnlikePostCommand, UnlikePostResponse>
	{

		private readonly AthletiqaDbContext _context;
		private readonly IValidator<UnlikePostCommand> _validator;
		public UnlikePostHandler(AthletiqaDbContext context,
			IValidator<UnlikePostCommand> validator)
		{
			_context = context;
			_validator = validator;

		}

		public async Task<UnlikePostResponse> Handle(UnlikePostCommand request, CancellationToken cancellationToken)
		{

			var validationResult = await _validator.ValidateAsync(request, cancellationToken);
			if (!validationResult.IsValid)
			{
				return new UnlikePostResponse
				{
					Success = false,
					Errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
				};
			}


			var postExists = await _context.Post.AnyAsync(p => p.PostId == request.PostId, cancellationToken);


			if (!postExists)
			{
				return new UnlikePostResponse
				{
					Success = false,
					ErrorMessage = "Post not found."
				};
			}


			// Check if the user has already liked the post
			var like = await _context.PostLike.FirstOrDefaultAsync(pl => pl.PostId == request.PostId && pl.UserId == request.UserId, cancellationToken);

			// If the like doesn't exist, return a response indicating that the user hasn't liked the post
			if (like == null) 
			{
				var currentLike= await _context.PostLike.CountAsync(pl => pl.PostId == request.PostId, cancellationToken);

				return new UnlikePostResponse
				{
					Success = true,
					IsLiked=false,
					LikeCount = currentLike,
				};
			}	

			// If the like exists, remove it from the database
			_context.PostLike.Remove(like);
			// Save the changes to the database
			await _context.SaveChangesAsync(cancellationToken);

			// Return a response indicating that the post has been unliked
			var likeCount = await _context.PostLike.CountAsync(pl => pl.PostId == request.PostId, cancellationToken);

			return new UnlikePostResponse
			{
				Success = true,
				PostId = request.PostId,
				LikeCount = likeCount,
				IsLiked = false
			};
		}
	}
}
