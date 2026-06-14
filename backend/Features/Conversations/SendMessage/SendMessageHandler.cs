using backend.Domain.Entities;
using backend.Features.Auth.Register;
using backend.Infrastructure.Database;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace backend.Features.Conversations.SendMessage
{
	public class SendMessageHandler : IRequestHandler<SendMessageCommand, SendMessageResult>
	{

		private readonly AthletiqaDbContext _context;
		private readonly IValidator<SendMessageCommand> _validator;
		public SendMessageHandler(AthletiqaDbContext context,
			IValidator<SendMessageCommand> validator)
		{
			_context = context;
			_validator = validator;

		}

		public async Task<SendMessageResult> Handle(SendMessageCommand request,
			CancellationToken cancellationToken)
		{
			var validationResult = await _validator.ValidateAsync(request, cancellationToken);
			if (!validationResult.IsValid)
			{
				return new SendMessageResult
				{
					Success = false,
					Errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
				};
			}


			var isUserInConversation = await _context.Conversation
				.AnyAsync(c => c.ConversationId == request.ConversationId &&
					(c.FirstUserId== request.SenderId || c.SecondUserId == request.SenderId),
					cancellationToken);





			if (!isUserInConversation)
			{
				return new SendMessageResult
				{
					Success = false,
					ErrorMessage = "Conversation not found."
				};
			}

			var message = new Message
			{
				Content = request.Content,
				SenderId = request.SenderId,
				ConversationId = request.ConversationId,
				TimeStamp = DateTime.UtcNow
			};
			_context.Message.Add(message);
			await _context.SaveChangesAsync(cancellationToken);


			return new SendMessageResult
			{
				Success = true,
				MessageId = message.MessageId,
				Content = message.Content
			};



		}
	}
}
