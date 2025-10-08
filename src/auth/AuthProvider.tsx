import React, { createContext, useEffect, useState, ReactNode } from "react";
// Asegúrate de que la ruta sea correcta
import { initKeycloak, getKeycloakInstance, login, logout } from './keycloak';

// ... (tus tipos User y AuthContextType se mantienen igual)
type User = {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
} | null;

type AuthContextType = {
    isAuthenticated: boolean;
    user: User;
    loading: boolean;
    login: () => void;
    logout: () => void;
};

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
                
                if (authenticated) {
                    const kc = getKeycloakInstance();
                    setUser({
                        id: kc.subject,
                        email: kc.tokenParsed?.email,
                        firstName: kc.tokenParsed?.given_name,
                        lastName: kc.tokenParsed?.family_name,
                    });
                }
            } catch (error) {
                console.error('Error en AuthProvider durante la inicialización:', error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
    
        initializeAuth();
    }, []); // El array de dependencias vacío es correcto

    const value = {
        isAuthenticated,
        user,
        loading,
        login, // Llama directamente a la función importada
        logout, // Llama directamente a la función importada
    };

    if (loading) {
        return <div>Cargando autenticación...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
