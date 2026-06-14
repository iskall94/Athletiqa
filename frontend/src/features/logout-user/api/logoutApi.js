const API_BASE = import.meta.env.VITE_API_URL || '';

export async function logoutUser()
{
    const response = await fetch(`${API_BASE}/api/auth/logout`, {
		method: 'POST',
		credentials: 'include'
	});

    if(!response.ok)
    {
        throw new Error("Kunde ej logga ut. Försök igen senare.");
    }

    return true;
}