using System.ComponentModel.DataAnnotations;

namespace backend.Domain.Entities;

public class Sport
{
    public int SportId { get; set; }
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    public ICollection<AthleteSport> AthleteSports { get; set; } = [];
}
