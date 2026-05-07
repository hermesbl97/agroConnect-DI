import { AuthUser, LoginRequest, RegisterRequest } from "../types/Auth";
import { LoginRespone } from "../types/LoginResponse";

const API_BASE_URL = "http://localhost:8088"; //define donde está el servidor
const TOKEN_STORAGE_KEY = "auth_token"; //se guarda en el local storage

function extractToken(data: LoginRespone): string { //si hay token coge el token de acceso y sino el jwt
    const token = data.token ?? data.access_token ?? data.jwt

    //si no encuentra nada en las opciones del token lanza un error para que nadie se pueda logear sin una clave valida 
    if (!token) {
        throw new Error("La API no devuelve el token")
    }

    return token
}

export async function loginRequest(payload: LoginRequest): Promise<{ token: string; role: string; id:number }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });  //Se envia el payload (username y password) en formato json

    //si la API devuelve un error 
    if (!response.ok) throw new Error("Credenciales incorrectas");

    //convierte la respuesta en un objeto
    const data = await response.json();
    // Extraemos el token con la función extractToken y devolvemos el rol
    return {
        token: extractToken(data),
        role: data.role,
        id: Number(data.userId)
    };
}

export async function registerRequest(payload: RegisterRequest): Promise<void> { //función de registro del usuario
    const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("No se pudo registrar al usuario")
    }
}

export async function meRequest(token: string): Promise<AuthUser> {
    //función cuando el usuario refresca la página o vuelve a entrar, 
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
            Authorization: `Bearer ${token}`, //envía el token usando el modelo Bearer
        },
    });

    if (!response.ok) {
        throw new Error("No se pudo obtener el usuario");
    }

    //Se obliga a que la respuesta del usuario sea con el modelo AuthUser para que la app conozca los datos que tiene el usuario logueado
    return (await response.json()) as AuthUser
};