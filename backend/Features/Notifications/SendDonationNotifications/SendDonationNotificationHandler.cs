using backend.Domain.Entities;
using backend.Infrastructure.Hubs;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using backend.Infrastructure.Database;

namespace backend.Features.Notifications.SendDonationNotifications;

public class SendDonationNotificationHandler(AthletiqaDbContext db, IHubContext<NotificationHub> hubContext ) : INotificationHandler<SendDonationNotificationEvent>
{
	public async Task Handle(SendDonationNotificationEvent notificationEvent, CancellationToken cancellationToken)
	{
		var settings = await db.NotificationSetting
			.FirstOrDefaultAsync(s => s.UserId == notificationEvent.AthleteId, cancellationToken);

		if (settings != null && !settings.DonationAlerts)
		{
			return;
		}

		// For translation in frontend.
		var templateVariables = new Dictionary<string, string>
		{
			{ "sponsorName", notificationEvent.SponsorName },
			{ "amount", notificationEvent.Amount.ToString("N0") }
        };

		var notification = new Notification
		{
			UserId = notificationEvent.AthleteId,
			Type = "Donation",
			TargetUrl = $"/donation-campaign/{notificationEvent.CampaignId}",
			Title = "NOTIF_DONATION_RECEIVED",
			Message = $"{notificationEvent.SponsorName}|{notificationEvent.Amount.ToString("N0")}"
		};

		db.Notification.Add(notification);
		await db.SaveChangesAsync(cancellationToken);

		await hubContext.Clients.User(notificationEvent.AthleteId).SendAsync("ReceiveNotification", new
		{
			id = notification.Id,
			title = notification.Title,
			message = notification.Message,
			type = notification.Type,
			targetUrl = notification.TargetUrl,
			createdAt = notification.CreatedAt,
			isRead = notification.IsRead
		}, cancellationToken);
	}
}