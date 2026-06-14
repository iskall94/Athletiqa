using backend.Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;
using backend.Features.Posts.GetComments;

namespace backend.Features.Posts.Comments;

public class GetCommentHandler(AthletiqaDbContext db) : IRequestHandler<GetCommentQuery, List<GetCommentResponse>>
{
	public async Task<List<GetCommentResponse>> Handle(GetCommentQuery query, CancellationToken cancellationToken)
	{
		return await db.Comment
			.Where(c => c.PostId == query.PostId)
			.Include(c => c.User)
				.ThenInclude(u => u.AspNetUser)
			.Include(c => c.User)
				.ThenInclude(u => u.AthleteProfile)
			.Include(c => c.User)
				.ThenInclude(u => u.SponsorProfile)
			.OrderByDescending(c => c.CreatedAt)
			.Select(c => new GetCommentResponse(
				c.Id,
				c.User.AspNetUser.FirstName + " " + c.User.AspNetUser.LastName,
				c.User.AthleteProfile != null
					? c.User.AthleteProfile.PhotoUrl
					: c.User.SponsorProfile!.PhotoUrl,
				c.User.AthleteProfile != null
					? ((int)c.User.AthleteProfile.Gender).ToString()
					: "company",
				c.Content,
				c.CreatedAt
			))
			.ToListAsync(cancellationToken);
	}
}
