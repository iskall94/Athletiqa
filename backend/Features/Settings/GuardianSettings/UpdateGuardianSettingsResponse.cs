namespace backend.Features.Settings.GuardianSettings
{
    public class UpdateGuardianSettingsResponse
    {
        public bool Success { get; set; }
        public string? ErrorMessage { get; set; }
        public List<string>? Errors { get; init; }
    }
}
