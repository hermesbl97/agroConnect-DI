import { createContext, useState, useEffect, useContext } from "react";
import { AuthUser, LoginRequest } from "../types/Auth";
import { meRequest, loginRequest } from "./AuthApi";

interface AuthContextType {
    user: AuthUser | null;
    token: string | null;
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    //si el usuario refresca la página, la sesión no se cierra
    const [token, setToken] = useState<string | null>(localStorage.getItem("auth_token")); 
    const [user, setUser] = useState<AuthUser | null>(() => {
        const savedUser = localStorage.getItem("auth_user");
        return savedUser ? JSON.parse(savedUser) : null;
    }); //se coge el usuario guardado pero como un objeto y no como un texto
    const [loading, setLoading] = useState(false); 

    const login = async (credentials: LoginRequest) => { //llama a la función de login
        try {
            // 1. Llamamos a la API 
            const data = await loginRequest(credentials);

            const newToken = data.token;
            const userData: AuthUser = {
                id: 0, // O el ID que venga de la API
                username: credentials.username,
                role: data.role as any,
                email: ""
            }; //creamos un objeto userData con los datos de las credenciales introducidas

            // Guardamos en el estado de React y cambie la pantalla (aparece botón de cerrar sesión)
            setToken(newToken);
            setUser(userData);

            // Guardamos en LocalStorage para que permanezca la sesión al cerrar el navegador
            localStorage.setItem("auth_token", newToken);
            localStorage.setItem("auth_user", JSON.stringify(userData));

        } catch (error) {
            throw error;
        }
    };

    const logout = () => { //al cerrar sesión borra las llaves del LocalStorage y el estado de React lo deja null
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        setToken(null);
        setUser(null);
    };

    return ( //pasamos los atributos que otras componentes podrán utilizar
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext); 
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
};