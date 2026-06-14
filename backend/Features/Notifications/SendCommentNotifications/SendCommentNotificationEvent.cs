using MediatR;

namespace backend.Features.Notifications.SendCommentNotifications;

public record SendCommentNotificationEvent(
	string PostOwnerId, 
	string CommenterName,
	int PostId
	) : INotification;