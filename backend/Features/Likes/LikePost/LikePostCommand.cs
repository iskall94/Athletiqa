using MediatR;

namespace backend.Features.Likes.LikePost
{
	public class LikePostCommand : IRequest<LikePostResponse>
	{
		public required int PostId { get; set; }
		public required string? UserId { get; set; } 
	} 
}