import {useNavigate} from "react-router-dom";
import {markNotificationAsRead} from "../api/notificationApi";
import { Avatar } from "../../../shared/ui/avatar";
import { useTranslation } from "react-i18next";

export function NotificationItem({ notif, setNotifications }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dateTime = new Date(notif.createdAt);

  async function handleClick() {
    if (notif.targetUrl) 
    {
      navigate(notif.targetUrl);
    }

    if (notif.isRead)
    {
      return;
    }

    try 
    {
      await markNotificationAsRead(notif.id);
      // Efficiently updates the specific notification's isRead status.
      setNotifications(prev => prev.map((n) => {
        const currentId = n.id || n.Id;
        return currentId === notif.id ? { ...n, isRead: true } : n;
      }));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }

  return (
    <div onClick={handleClick}
      className="p-4 border-b border-gray-100 hover:bg-gray-100/40 transition-colors relative flex gap-3 items-start cursor-pointer"
    >
      <Avatar 
        alt={t("Avisering")} 
        className="w-10 h-10" 
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-0.5">
          <div className="text-sm text-gray-700 leading-relaxed">
            {notif.displayText}
          </div>
          <span className="text-[0.625rem] text-gray-500 shrink-0 ml-2">
            {dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <p className="text-[0.625rem] text-gray-500">
          {dateTime.toLocaleDateString()}
        </p>
      </div>
      
      {/* Blue unread dot indicator */}
      {!notif.isRead && (
        <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
      )}
    </div>
  );
}
