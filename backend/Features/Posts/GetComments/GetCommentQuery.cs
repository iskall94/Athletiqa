using MediatR;
using backend.Features.Posts.GetComments;

namespace backend.Features.Posts.Comments;

public record GetCommentQuery(int PostId) : IRequest<List<GetCommentResponse>>;