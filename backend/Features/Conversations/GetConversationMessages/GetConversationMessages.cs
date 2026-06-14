using backend.Infrastructure.Database;
using Carter;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend.Features.Conversations.GetConversationMessages
{


    //Query to get all conversations for a user
    //Message item to return in the result
    public record MessageItem(int MessageId, string SenderId, string SenderName, string Content, DateTime Timestamp); 

    //List of messages in a conversation
    public record GetConversationMessagesResult(List<MessageItem> Messages);  
    
	//UserId is the aspnet user id of the user for which we want to get the conversations,
    //ConversationId is the id of the conversation for which we want to get the messages
    //Handler to get all conversations for a user	
    public record GetConversationMessagesQuery(string UserId, int ConversationId) : IRequest<GetConversationMessagesResult?>;

    //Endpoint to get all conversations for a user
    public class GetConversationMessagesEndpoint : ICarterModule  
	{
		public void AddRoutes(IEndpointRouteBuilder app)
		{
			app.MapGet("/api/conversations/{conversationId}/messages", async (ClaimsPrincipal user, IMediator mediator, string conversationId) =>
			{
                //Get the aspnet user id from the claims principal
                //If the aspnet user id is not found in the claims principal, return unauthorized
                var aspNetUserId = user.FindFirstValue(ClaimTypes.NameIdentifier); 
																				   
				if (string.IsNullOrEmpty(aspNetUserId))
				{
					return Results.Unauthorized();
				}
				//Validate the conversation id
				if (!int.TryParse(conversationId, out int conversationIdInt))
				{
					return Results.BadRequest("Invalid conversation ID.");
				}
				//Conversation id must be a positive integer
				if (conversationIdInt <= 0)
				{
					return Results.BadRequest("Conversation ID must be a positive integer.");
				}
				//Send the query to get all conversations for a user
				var conversations = await mediator.Send(new GetConversationMessagesQuery(aspNetUserId, conversationIdInt));
				return conversations is null ? Results.NotFound() : Results.Ok(conversations);
			})
			.RequireAuthorization();
		}
	}

	//Result of getting all conversations for a user

	public class GetConversationMessagesHandler(AthletiqaDbContext db) : IRequestHandler<GetConversationMessagesQuery, GetConversationMessagesResult?> //Handler to get all conversations for a user
	{
		private readonly AthletiqaDbContext _db = db;

		async Task<GetConversationMessagesResult?> IRequestHandler<GetConversationMessagesQuery, GetConversationMessagesResult?>.Handle(GetConversationMessagesQuery request, CancellationToken cancellationToken)
		{

			//Get all conversations for a user
			var conversation = await _db.Conversation.FirstOrDefaultAsync(c => (c.FirstUserId == request.UserId || c.SecondUserId == request.UserId)
																				&& c.ConversationId == request.ConversationId, cancellationToken);
			//If the conversation is not found, return null
			if (conversation == null)
			{
				return null;
			}

			//Get all messages for a conversation, ordered by created at
			var messages = await _db.Message
				.Where(m => m.ConversationId == request.ConversationId)
				.Include(m => m.Sender)
					.ThenInclude(u => u.AspNetUser)
				.OrderBy(m => m.TimeStamp)
				.Select(m => new MessageItem
				(
					m.MessageId, 
					m.SenderId, 
					m.Sender.AspNetUser.FirstName + " " + m.Sender.AspNetUser.LastName,
					m.Content, 
					m.TimeStamp
				))
				.ToListAsync(cancellationToken);
			//Return the result
			return new GetConversationMessagesResult(messages);
		}

	}

}
