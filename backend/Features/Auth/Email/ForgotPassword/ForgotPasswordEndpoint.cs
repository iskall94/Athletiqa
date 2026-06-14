using Carter;
using MediatR;

namespace backend.Features.Auth.Email.ForgotPassword;

public class ForgotPasswordEndpoint : ICarterModule
{
	public void AddRoutes(IEndpointRouteBuilder app)
	{
		app.MapPost("/api/auth/forgot-password", async (ForgotPasswordApiRequest request, ISender mediator) =>
		{
			var command = new ForgotPasswordCommand(request.Email);
			var result = await mediator.Send(command);

			// Even if the user doesn't exist, return 200 OK for account security
			return Results.Ok(new { success = true });
		});
	}
}