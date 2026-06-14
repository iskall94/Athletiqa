const API_BASE = import.meta.env.VITE_API_URL || '';

export async function createOnboardLink() {

    const response = await fetch(`${API_BASE}/api/stripe/create`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json().catch(() => null);

    if(!response.ok)
    {
        
        console.error("CreateOnboardLink error response: ", data);
        throw new Error("Kunde ej skapa Stripe-länk. Försök igen senare");
    }

    console.log("Onboard-Link Created");
    return data; // Returns the JSON response containing the onboard link URL for the Stripe account setup

}