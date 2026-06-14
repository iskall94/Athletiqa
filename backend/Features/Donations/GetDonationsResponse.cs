namespace backend.Features.Donations
{
    public record GetDonationsResponse(string? DonorName, decimal amount, DateTime CreatedAt);

}
