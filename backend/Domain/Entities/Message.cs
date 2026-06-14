using System.ComponentModel.DataAnnotations;

namespace backend.Domain.Entities
{
    public class Message
    {
        public int MessageId { get; set; }

        public int ConversationId { get; set; }
        public Conversation Conversation { get; set; } = null!;

		public string SenderId { get; set; } = string.Empty;
		public User Sender { get; set; } = null!;


		[StringLength(500)]
        public string Content { get; set; } = string.Empty;

		public DateTime TimeStamp { get; set; } = DateTime.UtcNow;
		
       
    }
}