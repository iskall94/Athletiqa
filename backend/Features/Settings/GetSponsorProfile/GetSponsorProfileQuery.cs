using backend.Domain.Enums;
using MediatR;

namespace backend.Features.Settings.GetSponsorProfile
{
    public record GetSponsorProfileQuery(string UserId) : IRequest<GetSponsorProfileResponse>;

    public class GetSponsorProfileResponse
    {
        public bool Success { get; set; }

        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Description { get; set; }
        public string? Email { get; set; }
        public string? PhotoUrl { get; set; }
        public string? PhotoPublicId { get; set; }
        public string? CompanyName { get; set; }
        public string? OrgNumber { get; set; }

        public string? ErrorMessage { get; set; }
    }
}
