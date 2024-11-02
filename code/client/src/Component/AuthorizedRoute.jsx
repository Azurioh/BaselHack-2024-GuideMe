import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useAuth } from "../auth/AuthContext";

AuthorizedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

function AuthorizedRoute({children}) {
    const { isLogin } = useAuth();

    console.log('isLogin authorized route:', isLogin);
    return isLogin ? children : <Navigate to='/login' replace />
}

export default AuthorizedRoute;
