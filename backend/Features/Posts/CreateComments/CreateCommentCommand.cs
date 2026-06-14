using MediatR;
using backend.Features.Posts.GetComments;

namespace backend.Features.Posts.Comments;

public record CreateCommentCommand(int PostId, string UserId, string Content) : IRequest<GetCommentResponse>;