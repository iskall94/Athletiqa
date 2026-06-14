import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const API_BASE = import.meta.env.VITE_API_URL || '';

// Provides authentication state and user info to the app
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    function login(userId) {
      localStorage.setItem("athletiqa_logged_in", "true");
      setIsAuthenticated(true);
      setCurrentUserId(userId ?? null);
    }

    async function logout() {
      try {
        await fetch(`${API_BASE}/api/auth/logout`, {
          method: 'POST',
          credentials: 'include',
        });
      } finally {
        localStorage.removeItem("athletiqa_logged_in");
        setIsAuthenticated(false);
        setCurrentUserId(null);
      }
    }
    
    //checks if user is authenticated
    useEffect(() => { 
      const wasLoggedIn = localStorage.getItem("athletiqa_logged_in") === "true";
      
      if (!wasLoggedIn) {
        setIsAuthenticated(false);
        setCurrentUserId(null);
        setIsLoading(false);
        return;
      }

      fetch(`${API_BASE}/api/users/me`, 
      {credentials: 'include'})
        .then(async(response) => {

        if (!response.ok) {
          localStorage.removeItem("athletiqa_logged_in");
          setIsAuthenticated(false);
          setCurrentUserId(null);
          return;
        }
        const user = await response.json();
        const userId = user.userId ?? user.id ?? null;
        setIsAuthenticated(true);
        setCurrentUserId(userId);
      })
      .catch(() => {
        localStorage.removeItem("athletiqa_logged_in");
        setIsAuthenticated(false);
        setCurrentUserId(null);
      })
      .finally(() => setIsLoading(false));
  }, []);
    return (
    <AuthContext.Provider value={{ isAuthenticated, currentUserId, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}