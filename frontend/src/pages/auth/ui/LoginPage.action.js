import { loginUser } from "../../../features/auth-by-email/api/authApi";

const API_BASE = import.meta.env.VITE_API_URL || '';

// login action function to handle form submission and call the loginUser API function, then handle the response and redirects
export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        await loginUser(email, password);

        const response = await fetch(`${API_BASE}/api/users/me`, {
            credentials: 'include',
        });
				if (!response.ok) 
				{
          const errorText = await response.text();
          console.error("Validation error detail:", errorText);
          throw new Error('Failed to fetch user data');
        }
    		const user = await response.json();
      	const userId = user.userId ?? user.id;

      	if (!userId) {
      		throw new Error('User id missing in login response');
      	}

        return { success: true, userId };
		
		} catch (error) {
			console.error('Login failed:', error);
      return { success: false, error: 'Inloggningen misslyckades. Försök igen.' };
    }
}