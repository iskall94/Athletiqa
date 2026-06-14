using MediatR;
using Microsoft.AspNetCore.Identity;

namespace backend.Features.Auth.Email.ConfirmEmail;

public record ConfirmEmailCommand(string UserId, string Token) : IRequest<IdentityResult>;