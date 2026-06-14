namespace backend.Features.Settings.ProfileSettings.UpdateAthlete
{
    public class UpdateAthleteProfileResponse
    {
        public bool Success { get; set; }
        public string? ErrorMessage { get; set; }
        public List<string>? Errors { get; init; }

    }
}
