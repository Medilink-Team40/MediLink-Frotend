import React, {createContext, useEffect, useState, ReactNode} from "react";
import Keycloak, { initKeycloak, logout } from './keycloak';
import { console } from "inspector/promises";

type User = {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    roles?: string[];
} | null;

type AuthContextType = {
    isAuthenticated : boolean;
    user: User;
    loading: boolean;
    login: () => void;
    logout: () => void;

}







export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const authenticated = await initKeycloak();
                setIsAuthenticated(authenticated);
                
                if (authenticated && Keycloak.tokenParsed) {
                    setUser({
                        id: Keycloak.subject,
                        email: Keycloak.tokenParsed.email,
                        firstName: Keycloak.tokenParsed.given_name,
                        lastName: Keycloak.tokenParsed.family_name
                    });
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const handleLogin = () => {
        Keycloak.login();
    };

    const handleLogout = () => {
        Keycloak.logout();
        setIsAuthenticated(false);
        setUser(null);
    };

    const value = {
        isAuthenticated,
        user,
        loading,
        login: handleLogin,
        logout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;