using backend.Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;
using backend.Domain.Entities;
using backend.Features.Posts.GetComments;
using FluentValidation;
using backend.Features.Notifications.SendCommentNotifications;

namespace backend.Features.Posts.Comments;

public class CreateCommentHandler(AthletiqaDbContext db, IValidator<CreateCommentCommand> validator, IMediator mediator) : IRequestHandler<CreateCommentCommand, GetCommentResponse>
{
    public async Task<GetCommentResponse> Handle(CreateCommentCommand command, CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(command, cancellationToken);

		if (!validationResult.IsValid)
		{
            throw new ValidationException(validationResult.Errors);
        }
        
        var post = await db.Post.FirstOrDefaultAsync(p => p.PostId == command.PostId, cancellationToken);

        if (post == null)
        {
            throw new KeyNotFoundException($"Post with ID {command.PostId} not found.");
        }

        var comment = new Comment
        {
            PostId = command.PostId,
            UserId = command.UserId,
            Content = command.Content,
            CreatedAt = DateTime.UtcNow
        };

        db.Comment.Add(comment);

        await db.SaveChangesAsync(cancellationToken);

		// Notification logic
		if (post.AthleteId != command.UserId)
		{
			var user = await db.Users
				.FirstOrDefaultAsync(u => u.Id == command.UserId, cancellationToken);

			if (user != null)
			{
				string commenterFullName = $"{user.FirstName} {user.LastName}";

				await mediator.Publish(new SendCommentNotificationEvent(
					PostOwnerId: post.AthleteId,
					CommenterName: commenterFullName,
					PostId: post.PostId
				), cancellationToken);
			}
		}

		var createdComment = await db.Comment
            .Include(c => c.User)
                .ThenInclude(u => u.AspNetUser)
            .Include(c => c.User)
                .ThenInclude(u => u.SponsorProfile)
            .Include(c => c.User)
                .ThenInclude(u => u.AthleteProfile)
            .FirstAsync(c => c.Id == comment.Id, cancellationToken);

        return new GetCommentResponse(
            createdComment.Id,
            $"{createdComment.User.AspNetUser.FirstName} {createdComment.User.AspNetUser.LastName}",
            createdComment.User.AthleteProfile?.PhotoUrl ?? createdComment.User.SponsorProfile?.PhotoUrl,
            createdComment.User.AthleteProfile is not null
                ? ((int)createdComment.User.AthleteProfile.Gender).ToString()
                : "company",
            createdComment.Content,
            createdComment.CreatedAt
        );
    }
}
