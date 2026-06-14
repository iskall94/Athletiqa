using Carter;
using MediatR;

namespace backend.Features.Sports.GetSports;

public class GetSportsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/sports", async (ISender mediator) =>
        {
            var sports = await mediator.Send(new GetSportsQuery());
            return Results.Ok(sports);
        });
    }
}
