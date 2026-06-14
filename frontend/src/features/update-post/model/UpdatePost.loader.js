const API_BASE = import.meta.env.VITE_API_URL || '';

export async function updatePostLoader({ params }) {
    const response = await fetch(`${API_BASE}/api/posts/${params.postId}`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Response("Kunde inte hämta inlägget", { status: response.status });
    }

    const post = await response.json();
    return { post };
}