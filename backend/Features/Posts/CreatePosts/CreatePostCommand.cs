using MediatR;

namespace backend.Features.Posts.CreatePosts;

public record CreatePostCommand(
	string UserId,
	string Title,
	string Content,
	List<CreatePostMediaRequest>? Media
) : IRequest<int>;