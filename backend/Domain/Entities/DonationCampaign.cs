namespace backend.Domain.Entities
{
    public class DonationCampaign
    {
        public int DonationCampaignId { get; set; }
        public int PostId { get; set; }
        public decimal GoalAmount { get; set; }
        public decimal CurrentAmount { get; set; }
        public DateTime? Deadline { get; set; }

        public Post Post { get; set; } = null!;
        public ICollection<Donation> Donations { get; set; } = [];
    }
}
