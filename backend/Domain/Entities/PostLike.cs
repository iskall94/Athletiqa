namespace backend.Domain.Entities
{
	public class PostLike
	{
		public int PostLikeId { get; set; }

		public int PostId { get; set; }
		public Post Post { get; set; } = null!;

		public string UserId { get; set; } = null!;
		public User User { get; set; } = null!;

		public DateTime CreatedAt { get; set; }= DateTime.UtcNow;




	}
}
