using backend.Features.Stripe.CreateStripeCheckout;
using MediatR;

namespace backend.Features.Stripe.CreatePayment
{
    public record CreateCheckoutCommand(int campaignId, long amount, string email, string? sponsorId, string donorName) : IRequest<CreateCheckoutResponse>; //Stripe wants amount in long

}
