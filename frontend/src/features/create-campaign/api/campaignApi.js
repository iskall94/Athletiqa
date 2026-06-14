const API_BASE = import.meta.env.VITE_API_URL || '';

export async function createCampaign(payload) {

    const response = await fetch(`${API_BASE}/api/donation-campaigns`, 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include'
    });

    const data = await response.json().catch(() => ({}));

    if (response.status === 401)
    {
        throw new Error("Session expired. Please log in again.");
    }

    if (response.status === 403)
    {
        throw new Error("Only athletes can create donation campaigns.");
    }

    if (!response.ok) 
    {
        throw new Error(data.message || `Failed to create campaign: ${response.status}`);
    }

    return data;
}
