// services/UsersApi.ts
import { User } from "../types/User";

export async function getUsersRequest(token: string | null): Promise<User[]> {
    if (!token) {
        throw new Error("No hay una sesión activa.");
    }

    const response = await fetch("http://localhost:8088/users", {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

        if (!response.ok) throw new Error("Error al obtener usuarios");

    return await response.json();
}