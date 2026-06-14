using MediatR;

namespace backend.Features.Auth.Email.ResetPassword;

public record ResetPasswordCommand(string Email, string ResetCode, string NewPassword) : IRequest<bool>;