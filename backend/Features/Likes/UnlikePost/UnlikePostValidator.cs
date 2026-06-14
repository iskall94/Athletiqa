using backend.Features.Likes.LikePost;
using FluentValidation;

namespace backend.Features.Likes.UnlikePost
{
	public class UnlikePostValidator : AbstractValidator<UnlikePostCommand>
	{
		public UnlikePostValidator()
		{

			RuleFor(x => x.PostId)
				 .GreaterThan(0).WithMessage("Post ID must be a positive integer");

			RuleFor(x => x.UserId)
				.NotEmpty()
				.WithMessage("User must be logged in");


		}

	}
}
