using MediatR;

namespace backend.Features.Notifications.SendLikeNotifications;

public record SendLikeNotificationEvent(string PostOwnerId, string LikerName, int PostId) : INotification;