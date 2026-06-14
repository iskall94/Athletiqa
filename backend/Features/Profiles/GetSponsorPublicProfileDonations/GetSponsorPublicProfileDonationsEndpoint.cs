using Carter;
using MediatR;
using System.Security.Claims;

namespace backend.Features.Profiles.GetSponsorPublicProfileDonations;

public class GetSponsorPublicProfileDonationsEndpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/sponsors/{publicProfileId:int}/donations", async (
            int publicProfileId,
            ISender sender,
            CancellationToken cancellationToken) =>
        {
            var donations = await sender.Send(
                new GetSponsorPublicProfileDonationsQuery(PublicProfileId: publicProfileId),
                cancellationToken);

            return Results.Ok(donations);
        });

        app.MapGet("/api/users/me/donations", async (
            ClaimsPrincipal user,
            ISender sender,
            CancellationToken cancellationToken) =>
        {
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Results.Unauthorized();
            }

            var donations = await sender.Send(
                new GetSponsorPublicProfileDonationsQuery(SponsorId: userId),
                cancellationToken);

            return Results.Ok(donations);
        }).RequireAuthorization();
    }
}
