using MediatR;

namespace backend.Features.Auth.Email.EmailVerification;

public record VerificationEmailCommand(string Email) : IRequest<bool>;