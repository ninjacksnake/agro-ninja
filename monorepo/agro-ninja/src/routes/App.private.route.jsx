import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Api from "../services/api";

const AppPrivateRoute = ({ children, roles = [] }) => {
    const { accessToken, user } = useSelector(state => state.auth);

    const isLogged = !!accessToken && !!user;

    if (isLogged) {
        const isTokenValid = async () => {
            try {
                const result = await Api.post("/verify-token", {token: accessToken});
               // console.log(result);
                if(result.status !== 200) {
                    return <Navigate to={'/login'}/>;
                }
                return result.data;
            } catch (error) {
                return <Navigate to={'/login'}/>;
            }
        }
        const isValid = isTokenValid();
        if (!isValid) {
            return <Navigate to="/login" />
        }
    }

    if (!user || !accessToken) {
        console.log("user is not logged in or accesToken is not valid")
        return <Navigate to="/login" />
    }

    if (roles.length > 0 && !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" />
    }
    return children
}

export default AppPrivateRoute