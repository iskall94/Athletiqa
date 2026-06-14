using MediatR;

namespace backend.Features.Notifications.GetNotifications;

public record Query(string UserId) : IRequest<List<Response>>;