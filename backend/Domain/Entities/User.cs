namespace backend.Domain.Entities;

public class User
{
    // Mirrors ApplicationUser.Id, set at registration
    public string UserId { get; set; } = null!;

    // Identity
    public ApplicationUser AspNetUser { get; set; } = null!;

    // Profiles
    public AthleteProfile? AthleteProfile { get; set; }
    public SponsorProfile? SponsorProfile { get; set; }

    // Settings
    public NotificationSetting NotificationSetting { get; set; } = null!;
    public PrivacySetting PrivacySetting { get; set; } = null!;

	// Activity
	public ICollection<Conversation> FirstUserConversations { get; set; } = [];
	public ICollection<Conversation> SecondUserConversations { get; set; } = [];
	public ICollection<Message> SentMessage { get; set; } = [];
	public ICollection<Post> Post { get; set; } = [];
    public ICollection<Comment> Comment { get; set; } = [];
	public ICollection<Notification> Notifications { get; set; } = [];
}

