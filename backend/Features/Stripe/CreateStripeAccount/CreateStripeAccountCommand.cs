using MediatR;

namespace backend.Features.Stripe.CreateStripeAccount;


    public sealed record Command(string userId) : IRequest<CreateStripeAccountResult>;

    //public sealed record Response(string? AccountId, string? Url);

    public class CreateStripeAccountResult
    { 
        public bool Success { get; set; }
        public string? AccountId { get; set; }
        public string? Url { get; set; }
        public string? ErrorMessage { get; set; }

    }

