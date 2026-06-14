using System.ComponentModel.DataAnnotations;
using backend.Domain.Enums;

namespace backend.Domain.Entities
{
    public class Guardian
    {
        [Key]
        public string GuardianId { get; set; } = Guid.NewGuid().ToString();

        [Required, EmailAddress, MaxLength(256)]
        public string Email { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string LastName { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public required string PhoneNumber { get; set; }

        [Required, MaxLength(13)]
        public string PersonalIdNumber { get; set; } = string.Empty;

        public GuardianRelationship Relationship { get; set; }
        public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
        public ICollection<AthleteProfile> Athletes { get; set; } = [];
    }
}
