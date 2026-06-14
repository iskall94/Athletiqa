namespace backend.Features.Posts.GetPosts;

public record GetPostMediaResponse(
    string MediaUrl,
    string? CloudinaryPublicId,
    string ResourceType
);
