namespace backend.Features.Auth.Email.ForgotPassword;

// Can not be named ForgotPasswordRequest because of a conflict in Microsofts built in Identity.
public record ForgotPasswordApiRequest(string Email);