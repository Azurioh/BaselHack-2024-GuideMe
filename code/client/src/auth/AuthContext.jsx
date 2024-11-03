import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(() => {
        return localStorage.getItem('isLogin') === 'true';
    });

    const login = () => {
        setIsLogin(true);
        localStorage.setItem('isLogin', 'true');
    };

    const logout = () => {
        setIsLogin(false);
        localStorage.setItem('isLogin', 'false');
    };

    return (
        <AuthContext.Provider value={{ isLogin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
