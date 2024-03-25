import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate

const useAuth = () => {
    const navigate = useNavigate(); // Use useNavigate for programmatic navigation

    const handleUnauthorized = useCallback(() => {
        // Delete the JWT token from local storage
        localStorage.removeItem('token'); // Adjust 'token' to your actual token key

        // Redirect the user to the login page
        navigate('/login'); // Use navigate with the path as the argument
    }, [navigate]); // Depend on navigate

    return { handleUnauthorized };
};

export default useAuth;
