namespace backend.Features.Posts.UpdatePost;

public record UpdatePostRequest(
	string? Title,
	string? Content,
	List<string>? MediaUrls // list of images
	);
