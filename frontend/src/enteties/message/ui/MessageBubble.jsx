import { Avatar } from "../../../shared/ui/avatar";
import { useTranslation } from "react-i18next";
// Displays a single message bubble,
// styled different dependant on if the user is the receiver or sender
function MessageBubble({ message, currentUserId }) {
  const { t } = useTranslation();
  const isSent = message.senderId === currentUserId;

  return (
    <div className={`flex w-full ${isSent ? "justify-end" : "justify-start"} mb-4`}>
      {/* The Avatar, only for received messages */}
      {!isSent && (
        <Avatar 
          src={message.avatarUrl} 
          alt={message.senderName || t("User")} 
          className="w-6 h-6 mr-2 shrink-0 start-self mt-1" 
        />
      )}

      <div className="flex flex-col max-w-[75%]">
        {/* Chat Bubble */}
        <div 
          className={`p-3 text-sm rounded-2xl relative ${
            isSent 
              ? "bg-accent-light text-gray-700 rounded-tr-sm"
              : "bg-gray-100 text-gray-700 rounded-tl-sm"
          }`}
        >
          <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Timestamp */}
        <span className={`text-[0.625rem] text-gray-500 mt-1 ${isSent ? "text-right" : "text-left ml-2"}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}

export default MessageBubble;