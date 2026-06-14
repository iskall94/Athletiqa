using Carter;
using MediatR;

namespace backend.Features.Auth.Email.ResetPassword;

public class ResetPasswordEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/reset-password", async (ResetPasswordApiRequest request, ISender mediator) =>
        {
            var command = new ResetPasswordCommand(request.Email, request.ResetCode, request.NewPassword);
            var result = await mediator.Send(command);

            if (!result)
            {
                return Results.BadRequest(new { message = "Lösenordsåterställningen misslyckades. Länken kan ha löpt ut." });
            }

            return Results.Ok(new { success = true });
        });
    }
}