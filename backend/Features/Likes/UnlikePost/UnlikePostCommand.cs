using MediatR;

namespace backend.Features.Likes.UnlikePost
{
	public class UnlikePostCommand : IRequest<UnlikePostResponse>
	{
		public required int PostId { get; set; }
		public required string? UserId { get; set; }
	}

}