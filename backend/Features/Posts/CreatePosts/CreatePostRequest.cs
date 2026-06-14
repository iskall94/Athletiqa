namespace backend.Features.Posts.CreatePosts;

public record CreatePostRequest(
	string Title,
	string Content,
	List<CreatePostMediaRequest>? Media
);
