const API_BASE = import.meta.env.VITE_API_URL || '';

export async function donateToUser({campaignId, donation})
{
  const response = await fetch(`${API_BASE}/api/checkout`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({amount: Number(donation.amount), campaignId, email: donation.email, donorName: donation.donorName})
	});

  const data = await response.json().catch(() => null);

  if(!response.ok)
  {
    console.error("Donation error response: ", data);
    throw new Error("Donation misslyckades, försök igen senare");
  }

  return data;
}