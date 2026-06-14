using MediatR;

namespace backend.Features.Notifications.SendDonationNotifications;

public record SendDonationNotificationEvent(
	string AthleteId,
	string SponsorName,
	decimal Amount, 
	int CampaignId
) : INotification;