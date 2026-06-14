using Carter;
using MediatR;
using System.Security.Claims;

namespace backend.Features.Sports.GetMySports;

public class GetMySportsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/users/me/sports", async (ClaimsPrincipal user, ISender mediator) =>
        {
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
                return Results.Unauthorized();

            var result = await mediator.Send(new GetMySportsQuery(userId));

            return result is null
                ? Results.Forbid()
                : Results.Ok(result);
        })
        .RequireAuthorization();
    }
}
