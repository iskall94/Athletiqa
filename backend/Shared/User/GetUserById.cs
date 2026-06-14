using backend.Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Carter;

namespace backend.Shared.User
{
    public class GetUserById
    {
        public record Query(string Id) : IRequest<Response?>;

        public record Response(string Id, string Email, string PhoneNumber);

        // Handler to process the Query and return the Response
        public class Handler(AthletiqaDbContext context) : IRequestHandler<Query, Response?>
        {

            // Handle the Query, fetch the user from the database with the specified Id.
            public async Task<Response?> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.AppUsers
                    .Include(u => u.AspNetUser)
                    .FirstOrDefaultAsync(u => u.UserId == request.Id, cancellationToken);

                if (user == null)
                {
                    return null;
                }

                return new Response(
                    user.UserId, 
                    user.AspNetUser.Email ?? string.Empty, 
                    user.AspNetUser.PhoneNumber ?? string.Empty);

            }
        }

        //Endpoint to get user by id. Send new Query(id) to the mediator and return the result
        public class Endpoint : ICarterModule
        {
            public void AddRoutes(IEndpointRouteBuilder app)
            {
                app.MapGet("/api/athlete/users/{id}", async (string id, IMediator mediator) =>
                {
                    var result = await mediator.Send(new Query(id));

                    if (result == null)
                    {
                        return Results.NotFound();
                    }

                    return Results.Ok(result);
                });
            }
        }
    }
}
