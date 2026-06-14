using backend.Domain.Entities;
using backend.Features.Conversations.SendMessage;
using Carter;
using MediatR;
using System.Security.Claims;

namespace backend.Features.Conversations.SendMessage
{

	//Request to send a message in a conversation
	public record SendMessageRequest( string Content);

	
	//Result of sending a message in a conversation
	public class SendMessageEndpoint :ICarterModule
	{
		//Endpoint to send a message in a conversation
		public void AddRoutes(IEndpointRouteBuilder app)
		{
			app.MapPost("/api/conversations/{conversationId}/messages",  async (
				int conversationId,
				SendMessageRequest request,
				ISender sender,
				ClaimsPrincipal user) =>
			{
				// Get the ASP.NET Identity user ID from the claims
				var aspNetUserId = user.FindFirstValue(ClaimTypes.NameIdentifier);
				if (string.IsNullOrEmpty(aspNetUserId))
				{
					return Results.Unauthorized();
				}
				// Send the command to the MediatR pipeline
				var result = await sender.Send(new SendMessageCommand{ConversationId = conversationId, Content = request.Content, SenderId = aspNetUserId});
			

				if (!result.Success) return Results.BadRequest(new { result.Errors });
				return Results.Ok(new { result.MessageId, result.Content });
			})
		    .RequireAuthorization()
			.WithTags("Conversations")
			.WithSummary("Send a message in a conversation");
		}
	}
}
