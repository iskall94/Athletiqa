namespace backend.Features.Auth.Email.ResetPassword;

public record ResetPasswordApiRequest(string Email, string ResetCode, string NewPassword);