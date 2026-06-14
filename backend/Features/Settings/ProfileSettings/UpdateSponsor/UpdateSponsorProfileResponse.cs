namespace backend.Features.Settings.ProfileSettings.UpdateSponsor
{
    public class UpdateSponsorProfileResponse
    {
        public bool Success { get; set; }
        public string? ErrorMessage { get; set; }
        public List<string>? Errors { get; init; }
    }
}
