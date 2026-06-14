namespace backend.Features.Posts.GetComments;

public record GetCommentResponse(
    int Id,
    string AuthorName,
    string? AuthorAvatar,
    string AuthorFallback,
    string Content,
    DateTime CreatedAt
);
