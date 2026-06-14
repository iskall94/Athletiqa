const API_BASE = import.meta.env.VITE_API_URL || '';

export async function getNotifications(userId) {

  const response = await fetch(`${API_BASE}/api/notifications?userId=${userId}`, {
    method: "GET",
    credentials: "include"
  });

  const data = await response.json().catch(() => ([]));
  
  if (!response.ok) {
    throw new Error("Failed to fetch notifications. Error: " + (data.message || response.statusText));
  }

  return data;
}

export async function markNotificationAsRead(notificationId) {
  const response = await fetch(`${API_BASE}/api/notification/${notificationId}/read`, {
    method: "PUT", 
    credentials: "include"
  });
  
  if (response.status === 204 || response.ok) 
  {
    return true;
  }

  const data = await response.json().catch(() => ([]));

  if (!response.ok) 
  {
    throw new Error(`Failed to mark notification as read. Error: ${data.message || response.statusText}`);
  }

  return true; 
}