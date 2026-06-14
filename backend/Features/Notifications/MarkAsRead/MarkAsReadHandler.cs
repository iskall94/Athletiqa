using MediatR;
using Microsoft.EntityFrameworkCore;
using backend.Infrastructure.Database;

namespace backend.Features.Notifications.MarkAsRead;

public class MarkAsReadHandler(AthletiqaDbContext db) : IRequestHandler<MarkAsReadCommand, bool>
{
	public async Task<bool> Handle(MarkAsReadCommand request, CancellationToken cancellationToken)
	{
		var notification = await db.Notification
			.FirstOrDefaultAsync(n => n.Id == request.Id && n.UserId == request.UserId, cancellationToken);

		if (notification == null)
		{
			return false;
		}

		notification.IsRead = true;
		await db.SaveChangesAsync(cancellationToken);

		return true;
	}
}