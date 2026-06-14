using backend.Domain.Enums;
using MediatR;
using System.Runtime.CompilerServices;

namespace backend.Features.Settings.ProfileSettings.UpdateAthlete
{
    public class UpdateAthleteProfileCommand : IRequest<UpdateAthleteProfileResponse>
    {
        public required string UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Bio { get; set; }
        public Gender? Gender { get; set; }
        public string? Email { get; set; }
        public string? PhotoUrl { get; set; }
        public string? PhotoPublicId { get; set; }
    }
}
