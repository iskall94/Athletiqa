using backend.Features.Conversations.SendMessage;
using FluentValidation;
using System.Data;

namespace backend.Features.Conversations.SendMessage
{
	public class SendMessageCommandValidator: AbstractValidator<SendMessageCommand>
	{

		public SendMessageCommandValidator() 
		{
			RuleFor(x => x.ConversationId)
				.GreaterThan(0)
				.WithMessage("Conversation ID must be a positive integer");

			 RuleFor(x=>x.Content)
				.NotEmpty().WithMessage("Message content is required")
				.MaximumLength(500).WithMessage("Message content must not exceed 500 characters");


		}

	}
}
