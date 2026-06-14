using MediatR;

namespace backend.Features.Posts.GetPosts;

public record GetPostQuery( string? searchWord, string? AthleteId = null) : IRequest<List<GetPostResponse>>;