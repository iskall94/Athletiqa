namespace backend.Domain.Entities;

public class AthleteSport
{
    public string AthleteId { get; set; } = string.Empty;
    public AthleteProfile Athlete { get; set; } = null!;

    public int SportId { get; set; }
    public Sport Sport { get; set; } = null!;
}
