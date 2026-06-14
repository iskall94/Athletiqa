using System.ComponentModel.DataAnnotations;

namespace backend.Domain.Entities
{
	public class Comment
	{
		public int Id { get; set; }

		public int PostId { get; set; }
		public Post Post { get; set; } = null!;
        public string UserId { get; set; } = string.Empty;
		public User User { get; set; } = null!;

        [StringLength(500)]
		public string Content { get; set; } = string.Empty;
		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	}
}
