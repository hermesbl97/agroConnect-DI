import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {JobOfferForm} from "./JobOfferForm";

describe("JobOfferForm Component", () => {
    it("debe capturar los datos de los inputs y llamar a onSubmit al enviar el formulario", () => {
        // Se crea la función espía (Mock) para onSubmit
        const onSubmitSpy = vi.fn();

        // Renderizamos el componente
        render(<JobOfferForm onSubmit={onSubmitSpy} isLoading={false} />);

        //  Buscamos los inputs por su etiqueta (Label). Usamos /i para que no importe mayúsculas/minúsculas
        const titleInput = screen.getByLabelText(/título del trabajo/i);
        const descriptionInput = screen.getByLabelText(/descripción/i);
        const locationInput = screen.getByLabelText(/localización/i);
        const salaryInput = screen.getByLabelText(/salario/i);
        const startDateInput = screen.getByLabelText(/fecha inicio/i);
        const endDateInput = screen.getByLabelText(/fecha fin/i);

        // Simulamos que el usuario rellena los campos del formulario
        fireEvent.change(titleInput, { target: { value: 'Poda de Viñedos' } });
        fireEvent.change(descriptionInput, { target: { value: 'Se requiere experiencia previa.' } });
        fireEvent.change(locationInput, { target: { value: 'Logroño' } });
        fireEvent.change(salaryInput, { target: { value: '14.50' } });
        fireEvent.change(startDateInput, { target: { value: '2026-06-01' } });
        fireEvent.change(endDateInput, { target: { value: '2026-08-01' } });

        //  Buscamos el botón de submit y simulamos que hacemos click
        const submitButton = screen.getByRole('button', { name: /publicar/i });
        fireEvent.click(submitButton);

        // Verificamos que se ha llamado a la función onSubmit una vez
        expect(onSubmitSpy).toHaveBeenCalledTimes(1);
        
        // Verificamos que el objeto enviado coincida con lo escrito
        expect(onSubmitSpy).toHaveBeenCalledWith({
            title: 'Poda de Viñedos',
            description: 'Se requiere experiencia previa.',
            location: 'Logroño',
            salary: 14.5, // Verificamos que sea número
            startDate: '2026-06-01',
            endDate: '2026-08-01'
        });
    });

    // Test para verificar que el botón se deshabilita y muestra "Publicando..." cuando isLoading es true
    it("debe deshabilitar el botón y mostrar 'Publicando...' cuando isLoading es true", () => {
        render(<JobOfferForm onSubmit={vi.fn()} isLoading={true} />);

        const button = screen.getByRole('button');
        
        // Verificamos que el botón esté bloqueado para evitar doble envío
        expect(button).toBeDisabled();
        
        // Verificamos que el texto cambie para informar al usuario
        expect(button).toHaveTextContent(/publicando.../i);
    });
});
