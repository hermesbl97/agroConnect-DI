import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { UserEditForm } from "./UserEditForm";

// 1. Limpieza absoluta después de cada test
afterEach(() => {
    cleanup();
});

// Mock del tema
vi.mock("../styles/colors", () => ({
    theme: {
        navbar: "#ffffff",
        borders: "#e4e4e7",
        primary: "#154212",
        subtext: "#71717a"
    }
}));

describe("UserEditForm Component", () => {
    // Mock de un usuario 
    const mockUser = {
        id: 1,
        username: "hermes_agro",
        name: "Hermes",
        surname: "Barriga",
        role: "user",
        telephoneNumber: 600123456,
        email: "hermes@test.com"
    } as any;

    it("debe llamar a onChange con los datos actualizados cuando se cambia el nombre", () => {
        const onChangeSpy = vi.fn();
        
        // Renderizamos el componente con el usuario de prueba y la función espía para onChange
        render(
            <UserEditForm 
                user={mockUser} 
                onChange={onChangeSpy} 
                onSave={vi.fn()} 
                onCancel={vi.fn()} 
            />
        );

        // Buscamos el input por su label
        const nameInput = screen.getByLabelText(/nombre/i);

        // Simulamos el cambio en el campo de nombre
        fireEvent.change(nameInput, { 
            target: { value: "Marcos", name: "name" } 
        });

        // Verificamos que se llamó a onChange con el objeto usuario actualizado
        expect(onChangeSpy).toHaveBeenCalledWith({
            ...mockUser, // Mantenemos el resto de campos igual y solo cambiamos el nombre
            name: "Marcos" 
        });
    });

    it("debe llamar a onSave cuando se envía el formulario", () => {
        const onSaveSpy = vi.fn((e) => e.preventDefault()); // Evitamos el refresh real
        
        render(
            <UserEditForm 
                user={mockUser} 
                onChange={vi.fn()} 
                onSave={onSaveSpy} 
                onCancel={vi.fn()} 
            />
        );

        // Buscamos el botón de guardar cambios y simulamos el click
        const saveButton = screen.getByText(/guardar cambios/i);
        fireEvent.click(saveButton);

        // Verificamos que onSave se ha llamado una vez
        expect(onSaveSpy).toHaveBeenCalledTimes(1);
    });

    it("debe llamar a onCancel cuando se pulsa el botón cancelar", () => {
        const onCancelSpy = vi.fn();
        
        render(
            <UserEditForm 
                user={mockUser} 
                onChange={vi.fn()} 
                onSave={vi.fn()} 
                onCancel={onCancelSpy} 
            />
        );

        // Buscamos el botón de cancelar y simulamos el click
        const cancelButton = screen.getByText(/cancelar/i);
        fireEvent.click(cancelButton);

        // Verificamos que onCancel se ha llamado una vez
        expect(onCancelSpy).toHaveBeenCalledTimes(1);
    });
});