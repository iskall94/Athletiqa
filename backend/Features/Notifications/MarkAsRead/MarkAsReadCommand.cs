using MediatR;

namespace backend.Features.Notifications.MarkAsRead;

public record MarkAsReadCommand(
	Guid Id, 
	string UserId
) : IRequest<bool>;