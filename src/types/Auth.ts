export interface AuthUser {
    id: number;
    username: string;
    role: "admin" | "user" | "agricultor"; // Los 3 roles que existen
    email: string;
}
export interface LoginRequest {
    username: string;
    password: string;   
}

export interface RegisterRequest {
    username: string;
    password: string;   
}