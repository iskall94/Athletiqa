const API_BASE = import.meta.env.VITE_API_URL || '';

//GET ALL SPORTS
export async function getAllSports()
{
    const response = await fetch(`${API_BASE}/api/sports`, {
        method: "GET",
        });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Get all sports error response: ", errorData);
        throw new Error("Kunde inte hämta sporterna, försök igen senare");
    }

    return await response.json();
}

//Get Donations from Sponsor
export async function getDonation(){
    const response = await fetch(`${API_BASE}/api/sponsors/donations`, {
        method: "GET",
        credentials: "include",
    });

    if(!response.ok)
    {
        const errorData = await response.json().catch(() => null);
        console.error("Get donations error response: ", errorData);
        throw new Error("Kunde inte hämta donationer, försök igen senare");
    }
    return response.json();
}

//GET MY CURRENT CAMPAIGNS
export async function getMyCampaigns()
{
    const response = await fetch(`${API_BASE}/api/campaigns/my`, {
        method: "GET",
        credentials: "include",
    });

    if(!response.ok)
    {
        const errorData = await response.json().catch(() => null);
        console.error("Get donations error response: ", errorData);
        throw new Error("Kunde inte hämta dina kampanjer. Försök igen senare.");
    }
    return response.json();
}