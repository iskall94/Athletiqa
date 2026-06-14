const API_BASE = import.meta.env.VITE_API_URL || '';

export async function getDonations(campaignId)

{
    const response = await fetch(`${API_BASE}/api/donations/${campaignId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
    // Sends specific error data rather than sending a generic message
    const errorData = await response.json().catch(() => null);
    console.error("Get donations error response: ", errorData);
    throw new Error("Kunde inte hämta donationer, försök igen senare");
  }  return response.json();
}