using backend.Domain.Entities;
using backend.Infrastructure.Database;
using Carter;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Donations
{

    public class GetDonationsEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("/api/donations/{campaignId}", async (ISender sender, int campaignId) =>
            {
                var result = await sender.Send(new GetDonationsQuery(campaignId));

                return Results.Ok(result);
            });
        }
    }
}
