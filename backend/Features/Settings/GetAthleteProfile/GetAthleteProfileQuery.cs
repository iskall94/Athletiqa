using backend.Domain.Enums;
using MediatR;

namespace backend.Features.Settings.GetAthleteProfile
{
    public record GetAthleteProfileQuery(string UserId) : IRequest<GetAthleteProfileResponse>;

    public class GetAthleteProfileResponse 
    { 
        public bool Success { get; set; }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Bio { get; set; }
        public string? Email { get; set; }
        public string? PhotoUrl { get; set; }
        public string? PhotoPublicId { get; set; }
        public Gender? Gender { get; set; }

        public string? ErrorMessage { get; set; }
    }


}
