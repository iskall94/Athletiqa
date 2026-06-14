using backend.Domain.Enums;
using MediatR;

namespace backend.Features.Settings.GuardianSettings
{
    public class UpdateGuardianSettingsCommand : IRequest<UpdateGuardianSettingsResponse>
    {
        public string UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public GuardianRelationship? Relationship { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
