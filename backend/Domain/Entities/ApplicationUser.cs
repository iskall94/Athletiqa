using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace backend.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        // Additional properties for Identity
        [StringLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [StringLength(100)]
        public string LastName { get; set; } = string.Empty;

        public string StripeAccountId { get; set; } = string.Empty;

        [StringLength(13)]
        public string PersonalIdNumber { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation property to User
        public User? User { get; set; }
    }
}
