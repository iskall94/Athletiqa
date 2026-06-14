namespace backend.Features.Stripe.StripeWebhook
{
    public class WebhookResponse
    {
        public bool Success { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
