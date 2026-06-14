namespace backend.Features.Donations.GetDonationsBySponsor
{
    public class GetDonationsResponse
    {
        public bool Success { get; set; }

        public int DonationsCount { get; set; }

        public List<DonationItem> DonationsList { get; set; } = []; //Saves a list of DonationItems, could be used for donation-history
        public string? ErrorMessage { get; set; }
    }

    public class DonationItem 
    { 
        public decimal Amount { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? CampaignTitle { get; set; }
        public string? AthleteName { get; set; }
        public string? Status { get; set; }
    }
}
