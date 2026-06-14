import { useEffect, useState } from "react";
import { getConversations } from "../../../enteties/message/api/messageApi";
import { Button } from "../../../shared/ui/button";
import { Avatar } from "../../../shared/ui/avatar";

// When a conversation is clicked,
// we want to load the messages for that conversation
// and display them in the chat window.
function ChatList({ onSelectUser, onCountChange }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    getConversations().then((fetchedConversations) => { // Fetch conversations from backend
      setConversations(fetchedConversations); // Update state with fetched conversations
      if (onCountChange) {
        onCountChange(fetchedConversations.length); // Notify parent about the count of conversations
      }
    });
  }, [onCountChange]);

  return (
    <aside className="chat-list">
      {conversations.map((user) => (
        <Button
          key={user.userId}
          variant="none"
          className="w-full flex items-center gap-3 text-left"
          onClick={() => onSelectUser(user)}
        >
          <Avatar src={user.avatarUrl} alt={user.name} size="sm" />
          <div className="flex flex-col">
            <strong className="text-primary">{user.name}</strong>
            <p className="text-sm text-gray-500">
              {user.lastMessage || "Inget meddelande ännu"}
            </p>
          </div>
        </Button>
      ))}
    </aside>
  );
}

export default ChatList;
