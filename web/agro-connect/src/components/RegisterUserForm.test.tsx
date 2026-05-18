import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { RegisterUserForm } from "./RegisterUserForm";

// Mock del tema para evitar errores de estilos
vi.mock("react-router-dom", () => ({
    Link: ({ children }: any) => <a>{children}</a>,
    useNavigate: () => vi.fn(),
}));

// Mock del tema para evitar errores de estilos
afterEach(cleanup);

describe("RegisterUserForm Component", () => {
    const mockFormData = {
        username: "testuser",
        password: "password123",
        name: "Juan",
        surname: "Pérez",
        email: "juan@test.com",
        telephoneNumber: 600123456
    };

    it("Llama a onChange cuando se escribe en el campo nombre", () => {
        const onChangeSpy = vi.fn();
        // Renderizamos el componente con la función espía para onChange
        render(<RegisterUserForm formData={mockFormData} onChange={onChangeSpy} onSubmit={vi.fn()} error={null} />);

        // Buscamos el input por su label
        const nameInput = screen.getByLabelText(/nombre/i);
        // Simulamos el cambio en el campo de nombre
        fireEvent.change(nameInput, { target: { value: "Marcos", name: "name" } });

        // Verificamos que la función espía fue llamada
        expect(onChangeSpy).toHaveBeenCalled();
    });

    it("Llama a onSubmit al hacer click en el botón", () => {
        const onSubmitSpy = vi.fn((e) => e.preventDefault()); // Evitamos que recargue la página en el test

        // Renderizamos el componente con la función espía para onSubmit
        render(<RegisterUserForm formData={mockFormData} onChange={vi.fn()} onSubmit={onSubmitSpy} error={null} />);

        // Buscamos el botón de submit por rol
        const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
        // Simulamos el click en el botón de submit
        fireEvent.click(submitButton);

        // Verificamos que se ha llamado a la función onSubmit una vez
        expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    });

    it("Muestra el mensaje de error cuando se recibe un error", () => {
        const errorMessage = "Error al registrar el usuario";
        // Renderizamos el componente con un mensaje de error
        render(<RegisterUserForm formData={mockFormData} onChange={vi.fn()} onSubmit={vi.fn()} error={errorMessage} />);
        
        // Verificamos que el mensaje de error se muestra en pantalla
        expect(screen.getByText(errorMessage)).toBeDefined();
    });
});