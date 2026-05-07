import { createContext, useState, useEffect, useContext, ReactNode, useReducer } from "react";
import { AuthAction, AuthContextType, AuthState, AuthUser, LoginRequest } from "../types/Auth";
import { meRequest, loginRequest } from "./AuthApi";


// La función que gestiona el estado (reducer). Recibe el estado actual y una acción y devuelve un estado nuevo.
function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        // ...state copia todo lo que hay previamente
        case 'LOGIN_START':
            return { ...state, loading: true, error: null }; //devolvemos una copia del estado pero con la carga
        case 'LOGIN_SUCCESS':
            return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
        case 'LOGIN_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'LOGOUT':
            return { user: null, token: null, loading: false, error: null };
        default:
            return state;
    }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Inicializamos el estado recuperando de LocalStorage
    const initialState: AuthState = {
        token: localStorage.getItem("auth_token"),
        user: JSON.parse(localStorage.getItem("auth_user") || "null"),
        loading: false,
        error: null
    };

    //state contiene los valores actuales y cambiamos el estado con dispatch
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async (credentials: LoginRequest) => {
        dispatch({ type: 'LOGIN_START' }); //comienza el proceso de login
        try {
            const data = await loginRequest(credentials); // Llamamos a la API 
            const userData: AuthUser = { //rellenamos el objeto con los datos obternidos de la api y los que predefinimos 
                id: data.id,
                username: credentials.username,
                role: data.role as AuthUser['role'],
                email: ""
            };

            localStorage.setItem("auth_token", data.token); //guardamos el token y los datos
            localStorage.setItem("auth_user", JSON.stringify(userData));

            // Notificamos al reducer que el login fue bien
            dispatch({ type: 'LOGIN_SUCCESS', payload: { user: userData, token: data.token } }); //Avisamos si todo va bien 
        } catch (err: any) {
            dispatch({ type: 'LOGIN_ERROR', payload: err.message }); //Avisamos si falla
            throw err;
        }
    };

    const logout = () => { // eliminamos del LocalStorage los credenciales
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        dispatch({ type: 'LOGOUT' });
    };

    return ( //Gestionamos el contexto de si esta logeado o no
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {/* Children representa a todos los componentes de la aplicación  */}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
};