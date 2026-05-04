export interface AuthUser {
    id: number;
    username: string;
    role: "admin" | "user" | "agricultor"; // Los 3 roles que existen
    email: string;
}

export interface AuthState {
    user: AuthUser | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

// CONTEXTO
export interface AuthContextType extends AuthState { 
    login: (credentials: LoginRequest) => Promise<void>; 
    logout: () => void;
}

// Definimos las acciones que pueden tener lugar 
export type AuthAction =
    | { type: 'LOGIN_START' }
    | { type: 'LOGIN_SUCCESS'; payload: { user: AuthUser; token: string } }
    | { type: 'LOGIN_ERROR'; payload: string }
    | { type: 'LOGOUT' };

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    name: string;
    surname: string;
    email: string;
    telephoneNumber: number;
}