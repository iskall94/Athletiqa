import { useState, useEffect } from "react";
import { fetchConversations, fetchMessages } from "../api/messageApi";

const useMessages = (conversationId) => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConversations()
      .then((data) => setConversations(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!conversationId) return;
    fetchMessages(conversationId)
      .then((data) => setMessages(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [conversationId]);

  return { conversations, messages, loading, error };
};

export default useMessages;
