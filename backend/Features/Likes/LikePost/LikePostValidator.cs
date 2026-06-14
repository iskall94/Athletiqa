using FluentValidation;

namespace backend.Features.Likes.LikePost
{
	public class LikePostValidator: AbstractValidator<LikePostCommand>
	{
		public LikePostValidator() { 
		
		   RuleFor(x => x.PostId)
				.GreaterThan(0).WithMessage("Post ID must be a positive integer");

			RuleFor(x => x.UserId)
				.NotEmpty()
				.WithMessage("User must be logged in");


		}

	}
}
