using backend.Domain.Enums;
using MediatR;

namespace backend.Features.Settings.GetGuardian
{
    public record GetGuardianQuery(string UserId) : IRequest<GetGuardianResponse>;

    public class GetGuardianResponse
    { 
        public bool Success { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public GuardianRelationship Relationship { get; set; }

        public string? ErrorMessage { get; set; }
    
    }
    
}
