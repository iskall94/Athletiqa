using Carter;
using MediatR;

namespace backend.Features.Stripe.StripeWebhook
{
    // Webhook is needed for Stripe to send status for checkout sessions (succeeded or expired)
    public class WebhookEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/api/webhook", async (HttpRequest request, ISender sender, CancellationToken cancellationToken) =>
            {
                var json = await new StreamReader(request.Body).ReadToEndAsync(); // stripe sends back json in HTTP-request

                var signature = request.Headers["Stripe-Signature"]; // Stripes sends an encrypted Signature that prevents false webhooks

                var result = await sender.Send(new WebhookCommand(json, signature));

                if (!result.Success)
                {
                    return Results.BadRequest(result.ErrorMessage);
                }

                return Results.Ok();
            });
        }
    }
}
