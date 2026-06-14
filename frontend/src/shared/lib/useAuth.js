import { AuthContext } from "./AuthContext";
import { useContext } from "react";

// Custom hook to access authentication state and user info
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) 
    {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}