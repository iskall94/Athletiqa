namespace backend.Domain.Entities
{
    public class NotificationSetting
    {
        public string UserId { get; set; } = string.Empty;
        public bool EmailNotification { get; set; }
        public bool MessageAlerts { get; set; }
        public bool DonationAlerts { get; set; }
        public bool PostAlerts { get; set; }
        public User User { get; set; } = null!;
    }
}
