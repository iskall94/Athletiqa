namespace backend.Features.Posts.GetPosts;

public record GetPostResponse(
    int PostId,
    int AthletePublicProfileId,
    string Title,
    string Content,
	List<GetPostMediaResponse>? MediaContents,
    string AthleteName,
    string? AthleteAvatar,
    int AthleteGender,
    DateTime CreatedAt
);
