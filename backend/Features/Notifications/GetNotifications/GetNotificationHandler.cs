using backend.Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Notifications.GetNotifications;

public class Handler(AthletiqaDbContext db) : IRequestHandler<Query, List<Response>>
{
	public async Task<List<Response>> Handle(Query request, CancellationToken cancellationToken)
	{
		int pageSize = 50;
		int pageNumber = 1;

		return await db.Notification
			.Where(n => n.UserId == request.UserId)
			.OrderByDescending(n => n.CreatedAt)
			.Skip((pageNumber - 1) * pageSize)
			.Take(pageSize)
			.Select(n => new Response(n.Id, n.Title, n.Message, n.Type, n.TargetUrl, n.IsRead, n.CreatedAt))
			.ToListAsync(cancellationToken);
	}
}