namespace backend.Features.Likes.UnlikePost
{
	public class UnlikePostResponse
	{
		public bool Success { get; init; }
		public int PostId { get; set; }
		public int LikeCount { get; set; }
		public bool IsLiked { get; set; }
		public string? ErrorMessage { get; init; }
		public List<string>? Errors { get; init; }
	}
}
