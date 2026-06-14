namespace backend.Domain.Entities
{
	public class Conversation
	{

		public int ConversationId { get; set; } 

		public string FirstUserId { get; set; } = string.Empty;
		public string SecondUserId { get; set; } = string.Empty;

		public User FirstUser { get; set; } = null!;
		public User SecondUser { get; set; } = null!;

		public ICollection<Message> Messages { get; set; } = new List<Message>();

	}
}
