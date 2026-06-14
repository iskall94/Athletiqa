using backend.Domain.Enums;
using MediatR;

namespace backend.Features.Settings.ProfileSettings.UpdateSponsor
{
    public class UpdateSponsorProfileCommand : IRequest<UpdateSponsorProfileResponse>
    {
        public required string UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Description { get; set; }
        public string? Email { get; set; }
        public string? CompanyName { get; set; }
        public string? OrgNumber { get; set; }
        public string? PhotoUrl { get; set; }
        public string? PhotoPublicId { get; set; }
    }
}
