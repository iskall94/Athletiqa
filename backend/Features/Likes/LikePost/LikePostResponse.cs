namespace backend.Features.Likes.LikePost
{
	public class LikePostResponse
	{
		public bool Success { get; init; }
		public int PostId { get; set; }
		public int LikeCount { get; set; }
		public bool IsLiked { get; set; }
		public string? ErrorMessage { get; init; }
		public List<string>? Errors { get; init; }
	}
}
