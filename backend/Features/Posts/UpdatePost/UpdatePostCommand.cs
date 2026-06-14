using MediatR;

namespace backend.Features.Posts.UpdatePost;

public record UpdatePostCommand(
	int PostId,
	string? Title,
	string? Content,
	List<string>? MediaUrls,
	string ActiveUserId // to check - is active user == creator 
	) : IRequest<IResult>;

