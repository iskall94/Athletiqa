using MediatR;

namespace backend.Features.Posts.DeletePost;


public record DeletePostCommand(int PostId, string ActiveUserId) : IRequest<IResult>;

