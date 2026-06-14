import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {logoutUser} from '../api/logoutApi'

export const useLogoutUser = () =>
{
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const logoutUserAccount = async () => {
        
        try
        {
            await logoutUser();
            navigate("/"); // Redirect to home page after logout
        }
        catch(error)
        {
            setError(error.message)
        }
    };

    return {logoutUserAccount, error}
}