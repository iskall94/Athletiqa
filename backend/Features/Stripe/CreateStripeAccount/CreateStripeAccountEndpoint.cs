using Carter;
using MediatR;
using System.Security.Claims;

namespace backend.Features.Stripe.CreateStripeAccount;

public class CreateStripeAccountEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("api/stripe/create", async (ClaimsPrincipal user, ISender sender, CancellationToken cancellationToken) =>
        {

            try
            {

                var userId = user.FindFirstValue(ClaimTypes.NameIdentifier); // finds userId from cookies

                if (string.IsNullOrEmpty(userId))
                {
                    return Results.Unauthorized();
                }

                var result = await sender.Send(new Command(userId), cancellationToken);

                if (!result.Success)
                {
                    return Results.NotFound(new { result.ErrorMessage });
                }

                return Results.Ok(result);
            }
            catch(Exception)
            {
                return Results.BadRequest();
            }

            
        }).RequireAuthorization(); // Only authenticated users can create a Stripe account
    }
}
