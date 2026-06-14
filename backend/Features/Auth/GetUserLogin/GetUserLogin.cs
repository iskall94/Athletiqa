using Carter;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using backend.Domain.Entities;
using backend.Infrastructure.Database;
using Microsoft.AspNetCore.Identity;

namespace backend.Features.Auth
{
	public record MyUserResponse(string UserId, string Email, string Role);
	public record GetMyUserQuery(string AspNetUserId) : IRequest<MyUserResponse?>;
	public class GetUserLoginEndpoint : ICarterModule
	{
		/// <summary>
		/// Adds user-related API endpoints to the specified endpoint route builder.
		/// </summary>
		/// <remarks>This method registers the '/api/users/me' endpoint, which returns information about
		/// the currently authenticated user. The endpoint requires the caller to be authenticated and will return 401
		/// Unauthorized if the user is not logged in.</remarks>
		/// <param name="app">The endpoint route builder to which the user API routes will be added. Must not be null.</param>
		public void AddRoutes(IEndpointRouteBuilder app)
		{
			app.MapGet("/api/users/me", async (ClaimsPrincipal user, IMediator mediator) =>
			{
				var aspNetUserId = user.FindFirstValue(ClaimTypes.NameIdentifier);

				if (string.IsNullOrEmpty(aspNetUserId))
				{
					return Results.Unauthorized();
				}
				
				var appUser = await mediator.Send(new GetMyUserQuery(aspNetUserId));

				return appUser is not null ? Results.Ok(appUser) : Results.NotFound();
			})
			.RequireAuthorization();
		}
	}
	public class GetMyUserHandler : IRequestHandler<GetMyUserQuery, MyUserResponse?>
	{
		private readonly AthletiqaDbContext _db;
		private readonly UserManager<ApplicationUser> _userManager;

        public GetMyUserHandler(AthletiqaDbContext db, UserManager<ApplicationUser> userManager)
		{
			_db = db;
			_userManager = userManager;
        }

		/// <summary>
		/// Retrieves the user profile information for the specified ASP.NET user identifier.
		/// </summary>
		/// <param name="request">The query containing the ASP.NET user identifier for which to retrieve the user profile.</param>
		/// <param name="cancellationToken">A cancellation token that can be used to cancel the operation.</param>
		/// <returns>A task that represents the asynchronous operation. The task result contains a <see cref="MyUserResponse"/>
		/// with the user's profile information if found; otherwise, <see langword="null"/>.</returns>
		public async Task<MyUserResponse?> Handle(GetMyUserQuery request, CancellationToken cancellationToken)
		{
			var userAccount = await _db.AppUsers
				.Include(u => u.AspNetUser)
				.FirstOrDefaultAsync(u => u.UserId == request.AspNetUserId, cancellationToken);

			if (userAccount == null) return null;

			var roles = await _userManager.GetRolesAsync(userAccount.AspNetUser);

            return new MyUserResponse(
				userAccount.UserId,
				userAccount.AspNetUser.Email ?? string.Empty,
				roles.FirstOrDefault() ?? string.Empty
			);
		}
	}
}
