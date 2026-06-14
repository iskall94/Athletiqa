using backend.Domain.Enums;

namespace backend.Features.Settings.ProfileSettings.UpdateAthlete;

public record UpdateAthleteProfileRequest(string? FirstName, string? LastName, string? Bio, Gender? Gender, string? Email, string? PhotoUrl, string? PhotoPublicId);