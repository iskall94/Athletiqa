using Carter;
using MediatR;

namespace backend.Features.Auth.Email.ConfirmEmail;

public class ConfirmEmailEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/email/verification/confirm", async (ConfirmEmailCommand command, IMediator mediator) =>
        {
            var result = await mediator.Send(command);
            return result.Succeeded
                ? Results.Ok(new { message = "Email successfully verified!" })
                : Results.BadRequest(result.Errors);
        })
        .WithTags("Auth", "Email");
    }
}