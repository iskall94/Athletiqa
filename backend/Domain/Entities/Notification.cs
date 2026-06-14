namespace backend.Domain.Entities;

public class Notification
{
	public Guid Id { get; set; } = Guid.NewGuid();
	public string UserId { get; set; } = string.Empty;
	public string Title { get; set; } = string.Empty;
	public string Message { get; set; } = string.Empty;
	public string Type { get; set; } = string.Empty;
	public string? TargetUrl { get; set; }
	public bool IsRead { get; set; } = false;
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	public User User { get; set; } = null!;
}