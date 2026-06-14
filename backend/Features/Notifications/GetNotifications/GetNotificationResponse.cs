namespace backend.Features.Notifications.GetNotifications;

public record Response(
	Guid Id,
	string Title,
	string Message,
	string Type,
	string? TargetUrl,
	bool IsRead,
	DateTime CreatedAt
);