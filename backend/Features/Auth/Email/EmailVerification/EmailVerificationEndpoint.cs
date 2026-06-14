using Carter;
using MediatR;

namespace backend.Features.Auth.Email.EmailVerification;

public class EmailVerificationEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/email/verification/request", async (VerificationEmailCommand command, IMediator mediator) =>
        {
            await mediator.Send(command);
            return Results.Ok(new { message = "Verification email sent." });
        })
        .WithTags("Auth", "Email");
    }
}