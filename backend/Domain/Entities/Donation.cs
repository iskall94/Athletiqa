namespace backend.Domain.Entities
{
    public class Donation
    {
        public int DonationId { get; set; }
        public int CampaignId { get; set; }
        public string? SponsorId { get; set; }
        public decimal Amount { get; set; }
        public string Status { get; set; } = string.Empty; // needed for Stripe to send status-codes for payments
        public string StripeSessionId { get; set; } = string.Empty;
        public string? DonorName { get; set; } // Get donors name from the Stripe Checkout
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DonationCampaign Campaign { get; set; } = null!;
        public SponsorProfile? Sponsor { get; set; } = null!;
    }
}
