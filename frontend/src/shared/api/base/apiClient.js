const API_BASE = import.meta.env.VITE_API_URL || '';

// Shared API client, wraps the fetch with common configs and error handling
// Defaults to sending a plain GET request.
export async function apiFetch(url, options = {}) {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options, // When you pass options through the function, the options object gets spread into the config
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error(`API error [${options.method || "GET"} ${url}]:`, errorData);
    throw new Error(errorData?.message ?? "Något gick fel, försök igen senare");
  }

  return response.json();
}