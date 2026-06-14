using System.ComponentModel.DataAnnotations;

namespace backend.Domain.Entities
{
    public class Post
    {
        public int PostId { get; set; }
        public string AthleteId { get; set; } = string.Empty;
        public string CreatedBy { get; set; } = string.Empty;

        [StringLength(100)]
        public string Title { get; set; } = string.Empty;

        [StringLength(2000)]
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public AthleteProfile Athlete { get; set; } = null!;
        public User Creator { get; set; } = null!;
        public DonationCampaign? DonationCampaign { get; set; }
        public ICollection<MediaContent> MediaContents { get; set; } = [];
	public ICollection<Comment> Comments { get; set; } = [];
        public ICollection<PostLike> Likes { get; set; } = [];
	}
}
