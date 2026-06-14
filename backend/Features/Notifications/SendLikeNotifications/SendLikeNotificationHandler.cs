using backend.Domain.Entities;
using backend.Infrastructure.Hubs;
using backend.Infrastructure.Database;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Notifications.SendLikeNotifications;

public class SendLikeNotificationHandler(AthletiqaDbContext db, IHubContext<NotificationHub> hubContext)
	: INotificationHandler<SendLikeNotificationEvent>
{
	public async Task Handle(SendLikeNotificationEvent notificationEvent, CancellationToken cancellationToken)
	{
		var settings = await db.NotificationSetting
			.FirstOrDefaultAsync(s => s.UserId == notificationEvent.PostOwnerId, cancellationToken);

		if (settings != null && !settings.PostAlerts)
		{
			return;
		}

		var notification = new Notification
		{
			UserId = notificationEvent.PostOwnerId,
			Type = "Like",
			TargetUrl = $"/post/{notificationEvent.PostId}",
			Title = "NOTIF_LIKE_RECEIVED",
			Message = $"{notificationEvent.LikerName}"
		};

		db.Notification.Add(notification);
		await db.SaveChangesAsync(cancellationToken);

		await hubContext.Clients.User(notificationEvent.PostOwnerId).SendAsync("ReceiveNotification", new
		{
			id = notification.Id,
			type = notification.Type,
			targetUrl = notification.TargetUrl,
			title = notification.Title,
			message = notification.Message,
			createdAt = notification.CreatedAt,
			isRead = notification.IsRead
		}, cancellationToken);
	}
}