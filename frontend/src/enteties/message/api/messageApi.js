const API_BASE = import.meta.env.VITE_API_URL || '';

// Fetches messages for a specific user
export async function getMessage(conversationId) {
  const response = await fetch(`${API_BASE}/api/conversations/${conversationId}/messages`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  const data = await response.json();
  return data.messages;
}

// Fetches the list of conversations for the current user
export async function getConversations() {
  const response = await fetch(`${API_BASE}/api/conversations`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch conversations");
  }

  const data = await response.json();
  return data.conversations;
}
