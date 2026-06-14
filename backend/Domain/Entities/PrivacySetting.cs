namespace backend.Domain.Entities
{
    public class PrivacySetting
    {
        public string UserId { get; set; } = string.Empty;
        public bool PublicProfile { get; set; }
        public bool AnonymousDonations { get; set; }
        public bool ShowInSearch { get; set; }
        public User User { get; set; } = null!;

    }
}
