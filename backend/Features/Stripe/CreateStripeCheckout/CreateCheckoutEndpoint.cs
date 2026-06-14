using Carter;
using MediatR;
using System.Security.Claims;

namespace backend.Features.Stripe.CreatePayment
{
    public class CreateCheckoutEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/api/checkout", async (CreateCheckoutCommand command, ISender sender, ClaimsPrincipal user, CancellationToken cancellationToken) =>
            {
                try
                {
                    var sponsorId = user.FindFirstValue(ClaimTypes.NameIdentifier);

                    var commandWithSponsor = command with { sponsorId = sponsorId };

                    var result = await sender.Send(commandWithSponsor);

                    if (!result.Success)
                    {
                        return Results.BadRequest(result.ErrorMessage);
                    }

                    return Results.Ok(new { result.Url });
                }
                catch (Exception ex)
                {
                    return Results.BadRequest(ex.Message);
                }
            });
        }
    }
}
