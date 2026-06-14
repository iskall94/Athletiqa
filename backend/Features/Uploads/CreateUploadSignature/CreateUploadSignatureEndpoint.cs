using System.Security.Claims;
using backend.Infrastructure.Services;
using Carter;
using FluentValidation;

namespace backend.Features.Uploads.CreateUploadSignature;

/// <summary>
/// Requires the logged-in user, which is read from auth claims,
/// validates usage/type/size and asks Cloudinary service
/// to create a signed upload payload and returns 
/// the payload to the frontend.
/// </summary>
public class CreateUploadSignatureEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/uploads/signature", async (
            CreateUploadSignatureRequest request,
            ClaimsPrincipal user,
            IValidator<CreateUploadSignatureRequest> validator,
            ICloudinaryUploadSignatureService signatureService) =>
        {
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
                return Results.Unauthorized();

            var validationResult = await validator.ValidateAsync(request);

            if (!validationResult.IsValid)
            {
                return Results.BadRequest(new
                {
                    message = "Invalid upload request.",
                    errors = validationResult.Errors.Select(error => error.ErrorMessage)
                });
            }

            var response = signatureService.CreateSignature(request, userId);

            return Results.Ok(response);
        })
        .RequireAuthorization();
    }
}
