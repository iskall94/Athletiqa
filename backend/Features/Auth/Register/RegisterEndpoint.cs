using Carter;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace backend.Features.Auth.Register;

public class RegisterEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/register", async (
            RegisterCommand command,
            ISender sender
            ) =>
        {
            var result = await sender.Send(command);

            // Handles bad requests and returns the error
            if (!result.Success) return Results.BadRequest(new { result.Errors });

            // Returns the new user
            return Results.Created($"/api/users/{result.UserId}", new { result.UserId });
        })
        .WithTags("Auth")
        .WithSummary("Register a new athlete or sponsor");
    }
}
