import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";
import { useAuth } from "../auth/AuthContext";

// Mock de estilos para evitar errores relacionados con Tailwind
vi.mock("react-router-dom", async () => {
    const actual = (await vi.importActual("react-router-dom")) as any;
    return {
        ...actual,
        NavLink: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    };
});

// Mock del tema para evitar errores de estilos
vi.mock("../auth/AuthContext", () => ({
    useAuth: vi.fn(),
}));

// Limpieza después de cada test para evitar interferencias entre tests
afterEach(() => {
    cleanup();
});
   
describe("Navbar", () => {
    
    it("muestra el botón de login cuando no hay usuario logueado", () => {
        // Simulamos que useAuth devuelve user: null
        (useAuth as any).mockReturnValue({
            user: null,
            logout: vi.fn(),
        });

        render(<Navbar />);

        // Verificamos que el enlace de Login existe
        expect(screen.getByText(/login/i)).toBeInTheDocument();
        // Verificamos que NO aparece el nombre del usuario
        expect(screen.queryByText(/hola,/i)).not.toBeInTheDocument();
    });

    it("muestra el botón de logout y llama a la función logout al hacer clic", async () => {
        const onLogoutSpy = vi.fn();
        
        // Simulamos usuario logueado
        (useAuth as any).mockReturnValue({
            user: { username: "testuser", role: "user" },
            logout: onLogoutSpy,
        });

        render(<Navbar />);

        // Buscamos el botón por su rol (como hace tu profesor en la imagen)
        const logoutButton = screen.getByRole("button", { name: /cerrar sesión/i });
        
        // Simulamos el click en el botón de logout
        await userEvent.click(logoutButton);

        // Verificamos que se ha llamado a la función logout
        expect(onLogoutSpy).toHaveBeenCalledTimes(1);
    });

    it("muestra el enlace de Usuarios solo si el usuario es admin", () => {
        // Simulamos usuario admin
        (useAuth as any).mockReturnValue({
            user: { username: "admin", role: "admin" },
            logout: vi.fn(),
        });

        render(<Navbar />);

        // Verificamos que el enlace de Usuarios aparece
        expect(screen.getByText(/usuarios/i)).toBeInTheDocument();
        // Verificamos que también aparece la plataforma de empleo
        expect(screen.getByText(/plataforma de empleo/i)).toBeInTheDocument();
    });

    it("No muestra el enlace de Usuarios si el rol es 'user'", () => {
        // Simulamos usuario estándar
        (useAuth as any).mockReturnValue({
            user: { username: "juan", role: "user" },
            logout: vi.fn(),
        });

        render(<Navbar />);

        // Verificamos que el enlace de Usuarios NO aparece
        expect(screen.queryByText(/usuarios/i)).not.toBeInTheDocument();
        // Verificamos que sigue apareciendo la plataforma de empleo
        expect(screen.getByText(/plataforma de empleo/i)).toBeInTheDocument();
    });
});