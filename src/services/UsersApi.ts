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

export async function updateUserRequest(token: string | null, user: User): Promise<void> {
    if (!token) throw new Error("No hay sesión activa");

    const response = await fetch(`http://localhost:8088/users/${user.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) throw new Error("No se pudieron guardar los cambios");
}

export async function deleteUserRequest(token: string | null, userId: number): Promise<void> {
    if (!token) throw new Error("No hay sesión activa"); // Seguridad extra

    const response = await fetch(`http://localhost:8088/users/${userId}`, {
        method: "DELETE",
        headers: { 
            "Authorization": `Bearer ${token}` 
        }
    });
    
    if (!response.ok) throw new Error("No se pudo eliminar el usuario");
}