using backend.Domain.Entities;
using backend.Domain.Enums;

namespace backend.Features.DonationCampaigns.GetMyCampaigns
{
    public class GetMyCampaignsResponse
    {
        public string? Title { get; set; }

        public decimal CurrentAmount { get; set; }

        public decimal GoalAmount { get; set; }

        public string? MediaUrl { get; set; }

        public DateTime? CreatedAt { get; set; }

        public decimal AverageDonationAmount { get; set; }

        public int DonationCount { get; set; }
    }

}
