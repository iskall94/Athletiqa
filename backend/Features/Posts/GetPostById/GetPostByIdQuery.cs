using MediatR;
using Microsoft.AspNetCore.Http;
using backend.Features.Posts.GetPosts;

namespace backend.Features.Posts.GetPostById;

public record GetPostByIdQuery(int PostId) : IRequest<GetPostResponse>;