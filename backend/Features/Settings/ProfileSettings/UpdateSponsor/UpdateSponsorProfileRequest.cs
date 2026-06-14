namespace backend.Features.Settings.ProfileSettings.UpdateSponsor;

public record UpdateSponsorProfileRequest(
    string? FirstName, 
    string? LastName, 
    string? Description, 
    string? Email, 
    string? CompanyName, 
    string? OrgNumber, 
    string? PhotoUrl, 
    string? PhotoPublicId
);