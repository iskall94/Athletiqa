import { redirect } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || '';

// React Router Action that handles the update post lifecycle
export async function updatePostAction({ request, params }) {
  const formData = await request.formData();

  const updatedData = {
    title: formData.get("title"),
    content: formData.get("content"),
    mediaUrls: formData.get("mediaUrl") ? [formData.get("mediaUrl")] : []
  };

  const response = await fetch(`${API_BASE}/api/posts/${params.postId}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    return { error: "Kunde inte spara ändringarna." };
  }
  // returns to athlete profile
  return redirect("/athlete-profile");
}