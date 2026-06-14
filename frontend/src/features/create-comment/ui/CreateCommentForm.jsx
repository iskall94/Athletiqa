import { useState } from "react";
import { createComment } from "../api/commentApi";
import { useTranslation } from "react-i18next";

export function CreateCommentForm({ postId, onCommentCreated }) {
  const { t } = useTranslation();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError(t("Kommentaren kan inte vara tom."));
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      const newComment = await createComment(postId, content);
      setContent("");
      if (onCommentCreated) {
        onCommentCreated(newComment);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {error && <p className="text-sm text-red-500">{error}</p>}
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={t("Skriv din kommentar...")}
        disabled={isSubmitting}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-surface text-sm text-gray-700 focus:outline-none focus:border-primary disabled:opacity-50"
      />
    </form>
  );
}