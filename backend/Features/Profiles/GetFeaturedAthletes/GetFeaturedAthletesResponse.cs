namespace backend.Features.Profiles.GetFeaturedAthletes;

public record GetFeaturedAthletesResponse(
    int PublicProfileId,
    string Name,
    string? Sport,
    string? PhotoUrl,
    int Gender
);
