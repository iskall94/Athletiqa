using MediatR;

namespace backend.Features.Stripe.StripeWebhook
{
    public record WebhookCommand(string Json, string Signature) : IRequest<WebhookResponse>;
    
}
