using backend.Domain.Entities;
using backend.Domain.Enums;
using backend.Features.Auth.Register;
using backend.Infrastructure.Database;
using Carter;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend.Features.Settings.ProfileSettings.UpdateAthlete
{

    public class UpdateAthleteProfileEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPatch("/api/user/athlete/update", async (ClaimsPrincipal user, UpdateAthleteProfileRequest request, ISender sender) =>
            {
                var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

                if (string.IsNullOrEmpty(userId))
                {
                    return Results.Unauthorized();
                }

                var command = new UpdateAthleteProfileCommand
                {
                    UserId = userId,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Bio = request.Bio,
                    Gender = request.Gender,
                    Email = request.Email,
                    PhotoUrl = request.PhotoUrl,
                    PhotoPublicId = request.PhotoPublicId
                };

                var result = await sender.Send(command);

                if (!result.Success)
                {
                    if (result.ErrorMessage == "User not found")
                    {
                        return Results.NotFound(result);
                    }

                    return Results.BadRequest(result);
                }

                return Results.Ok(result);
            }).WithTags("User");
        }
    }
}
