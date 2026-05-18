import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { UserComponent } from "./UserComponent";

// Mock del tema para evitar errores de estilos
vi.mock("../styles/colors", () => ({
    theme: {
        primary: "#154212", 
        bg: "#f9f9f7",      
        text: "#1a1c1b",  
        subtext: "#42493e", 
        navbar: "#ffffff",
        borders: "#E6E6E1",
        info: "#3b6934",
        error: "#ba1a1a",
        roles: {
            user: "bg-emerald-100 text-emerald-800 border-emerald-200",
            admin: "bg-amber-100 text-amber-800 border-amber-200",
            agricultor: "bg-purple-100 text-purple-800 border-purple-200",
            default: "bg-blue-100 text-blue-800 border-blue-200",
        }
    }
}));
// Después de cada test, limpiamos el DOM para evitar interferencias entre tests
afterEach(() => {
    cleanup();
});


describe("UserComponent", () => {
    const mockUser = {
        id: 42,
        username: "hermes_admin",
        name: "Hermes",
        surname: "Barriga",
        role: "admin",
        email: "hermes@agroconnect.com"
    } as any;

    it("debe mostrar la información del usuario correctamente", () => {
        // Renderizamos el componente con el usuario de prueba
        render(
            <table>
                <tbody> 
                    <UserComponent user={mockUser} onEdit={vi.fn()} onDelete={vi.fn()} />
                </tbody>
            </table>
        );

        // Verificamos que el nombre de usuario y el nombre completo aparecen
        expect(screen.getByText("hermes_admin")).toBeDefined();
        expect(screen.getByText(/hermes barriga/i)).toBeDefined();
        expect(screen.getByText("admin")).toBeDefined();
    });

    it("debe llamar a onDelete con el ID 42 cuando se pulsa eliminar", () => {
        const onDeleteSpy = vi.fn();
        
        // Renderizamos el componente con el usuario de prueba y la función espía para onDelete
        render(
            <table>
                <tbody>
                    <UserComponent user={mockUser} onEdit={vi.fn()} onDelete={onDeleteSpy} />
                </tbody>
            </table>
        );

        // Buscamos el botón de eliminar 
        const deleteButton = screen.getByRole('button', { name: /eliminar hermes_admin/i });
        // Simulamos el click en el botón de eliminar
        fireEvent.click(deleteButton);

        // Verificamos que onDelete se ha llamado una vez con el ID correcto
        expect(onDeleteSpy).toHaveBeenCalledTimes(1);
        expect(onDeleteSpy).toHaveBeenCalledWith(42);
    });
});