
using MediatR;

namespace backend.Features.Conversations.SendMessage
{

	public class SendMessageCommand : IRequest<SendMessageResult>
	{

		public required int ConversationId { get; init; }
		public required string Content { get; init; }
		public required string? SenderId { get; init; }


	}


	public class SendMessageResult
	{
		public bool Success { get; init; }
		public int MessageId { get; init; }
		public string? Content { get; init; }
		public string? ErrorMessage { get; init; }
		public List<string>? Errors { get; init; }


	}
}

