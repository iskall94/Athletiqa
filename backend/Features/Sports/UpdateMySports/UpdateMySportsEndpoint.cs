using Carter;
using MediatR;
using System.Security.Claims;

namespace backend.Features.Sports.UpdateMySports;

public class UpdateMySportsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/api/users/me/sports", async (
            UpdateMySportsRequest request,
            ClaimsPrincipal user,
            ISender mediator) =>
        {
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
                return Results.Unauthorized();

            var result = await mediator.Send(
                new UpdateMySportsCommand(userId, request.Sports)
            );

            return result switch
            {
                UpdateMySportsResult.Success => Results.NoContent(),

                UpdateMySportsResult.NotAthlete =>
                    Results.Json(
                        new { message = "Only athletes can update sports. " },
                        statusCode: StatusCodes.Status403Forbidden
                    ),

                UpdateMySportsResult.InvalidSports =>
                    Results.BadRequest(
                        new { message = "One or more selected sports do not exist." }
                    ),

                _ => Results.BadRequest()
            };
        })
        .RequireAuthorization();
    }
}
