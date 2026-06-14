namespace backend.Features.Posts.CreatePosts;

public record CreatePostMediaRequest(
    string Url,
    string? CloudinaryPublicId,
    string ResourceType
);
