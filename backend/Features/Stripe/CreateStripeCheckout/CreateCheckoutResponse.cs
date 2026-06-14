namespace backend.Features.Stripe.CreateStripeCheckout
{
    public class CreateCheckoutResponse
    {
        public bool Success { get; set; }
        public string? Url { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
