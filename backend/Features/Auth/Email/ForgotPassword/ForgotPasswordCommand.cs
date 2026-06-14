using MediatR;

namespace backend.Features.Auth.Email.ForgotPassword;

public record ForgotPasswordCommand(string Email) : IRequest<bool>;