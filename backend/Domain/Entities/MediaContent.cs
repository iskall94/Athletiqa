using System.ComponentModel.DataAnnotations;
using backend.Domain.Enums;

namespace backend.Domain.Entities
{
    public class MediaContent
    {
        public int MediaContentId { get; set; }
        public int PostId { get; set; }

        [StringLength(500)]
        public string MediaUrl { get; set; } = string.Empty;

        [StringLength(500)]
        public string? CloudinaryPublicId { get; set; }

        public MediaType MediaType { get; set; }

        public Post Post { get; set; } = null!;
    }
}
