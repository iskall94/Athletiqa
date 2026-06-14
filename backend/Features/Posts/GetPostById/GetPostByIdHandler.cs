using backend.Infrastructure.Database;
using backend.Features.Posts.GetPosts;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Posts.GetPostById;

public class GetPostByIdHandler(AthletiqaDbContext db) : IRequestHandler<GetPostByIdQuery, GetPostResponse?>
{
    public async Task<GetPostResponse?> Handle(GetPostByIdQuery request, CancellationToken cancellationToken)
    {
        return await db.Post
            .Include(p => p.MediaContents)
            .AsNoTracking()
            .Where(p => p.PostId == request.PostId)
            .Select(p => new GetPostResponse(
                p.PostId,
                p.Athlete.PublicProfileId,
                p.Title,
                p.Content,
                p.MediaContents.Select(m => new GetPostMediaResponse(
                    m.MediaUrl,
                    m.CloudinaryPublicId,
                    m.MediaType == backend.Domain.Enums.MediaType.Video ? "video" : "image"
                )).ToList(),
                p.Athlete.User.AspNetUser.FirstName + " " + p.Athlete.User.AspNetUser.LastName,
                p.Athlete.PhotoUrl,
                (int)p.Athlete.Gender,
                p.CreatedAt))
            .FirstOrDefaultAsync(cancellationToken);
    }
}