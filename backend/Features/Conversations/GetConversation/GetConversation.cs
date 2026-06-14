using backend.Domain.Entities;
using backend.Infrastructure.Database;
using Carter;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend.Features.Conversations.GetConversation
{
	//Query to get all conversations for a user
	public record ConversationItem(int ConversationId, string UserId, string Name); //UserId is the other user in the conversation
	public record GetConversationResult(List<ConversationItem> Conversations); //List of conversations for a user
	public record GetConversationQuery(string UserId) : IRequest<GetConversationResult>; //UserId is the aspnet user id of the user for which we want to get the conversations

	//Handler to get all conversations for a user

	public class GetConversationEndpoint : ICarterModule //Endpoint to get all conversations for a user
	{
		public void AddRoutes(IEndpointRouteBuilder app)
		{
			app.MapGet("/api/conversations", async (ClaimsPrincipal user, IMediator mediator) =>
			{
				var aspNetUserId = user.FindFirstValue(ClaimTypes.NameIdentifier);
				if (string.IsNullOrEmpty(aspNetUserId))
				{
					return Results.Unauthorized();
				}
				var conversations = await mediator.Send(new GetConversationQuery(aspNetUserId));
				return conversations is not null ? Results.Ok(conversations) : Results.NotFound();
			})
			.RequireAuthorization();
		}
	}

	//Result of getting all conversations for a user

	public class GetConversationHandler(AthletiqaDbContext db) : IRequestHandler<GetConversationQuery, GetConversationResult> //Handler to get all conversations for a user
	{
		private readonly AthletiqaDbContext _db = db;

		async Task<GetConversationResult> IRequestHandler<GetConversationQuery, GetConversationResult>.Handle(GetConversationQuery request, CancellationToken cancellationToken)
		{

			//Get all conversations for a user
			var conversation = await _db.Conversation
				.Include(c => c.FirstUser)
					.ThenInclude(u => u.AspNetUser)
				.Include(c => c.SecondUser)
					.ThenInclude(u => u.AspNetUser)
				.Where(u => u.FirstUserId == request.UserId || u.SecondUserId == request.UserId)
				.ToListAsync(cancellationToken);

			//Map conversations to conversation items
			var conversationItems = conversation.Select(c =>
			{
				var otherUser = c.FirstUserId == request.UserId ? c.SecondUser : c.FirstUser;
				var name = $"{otherUser.AspNetUser.FirstName} {otherUser.AspNetUser.LastName}";

				return new ConversationItem(c.ConversationId, otherUser.UserId, name);
			}).ToList();

			return new GetConversationResult(conversationItems);
		}

	}	

	
}
