using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;

namespace backend.Infrastructure.Hubs;

// Empty hub for sending notifications to clients.
// IHubContext<NotificationHub> is injected into handlers that need to send notifications,
// and clients can connect to this hub to receive real-time updates.
[Authorize]
public class NotificationHub : Hub
{
}