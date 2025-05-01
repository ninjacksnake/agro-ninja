import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Api from "../services/api";

const AppPrivateRoute = ({ children, roles = [] }) => {
    const { accessToken, user } = useSelector(state => state.auth);
    const [isValidating, setIsValidating] = useState(true);
    const [isValid, setIsValid] = useState(false);

    const validateToken = useCallback(async () => {
        if (!accessToken || !user) {
            setIsValid(false);
            setIsValidating(false);
            return;
        }

        try {
            const result = await Api.post("verify-token", { token: accessToken });
            setIsValid(result.status === 200);
        } catch (error) {
            //console.error('Token validation error:', error);
            setIsValid(false);
            // Clear localStorage on token validation failure
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } finally {
            setIsValidating(false);
        }
    }, [accessToken, user]);

    useEffect(() => {
        // Add a small delay to prevent immediate validation on every render
        const timeoutId = setTimeout(() => {
            validateToken();
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [validateToken]);

    if (isValidating) {
        return <div>Loading...</div>; // Add a proper loading component
    }

    if (!isValid || !user || !accessToken) {
        console.log('No accestoken or user',accessToken, user)
       return <Navigate to="/login" replace />;
    }

    if (roles.length > 0 && !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default AppPrivateRoute;