import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { JobOfferEditForm } from "./JobOfferEditForm";

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
            user: "mock-class",
            admin: "mock-class",
            agricultor: "mock-class",
            default: "mock-class",
        }
    }
}));

describe("JobOfferEditForm Component", () => {


    //mockeamos objeto
    const mockOffer = {
        title: "Poda de Olivos",
        description: "Se busca podador experto",
        location: "Zaragoza",
        salary: 15,
    } as any;

    //testeamos que se llama al evento
    it("Llama a onChange con los datos correctos al escribir en el campo título", () => {
        const onChangeSpy = vi.fn();

        render(
            <JobOfferEditForm
                offer={mockOffer}
                onChange={onChangeSpy}
                onSave={vi.fn()}
                onCancel={vi.fn()}
            />
        );

        // Busca el input por el texto de su etiqueta
        const titleInput = screen.getByRole('textbox', { name: /título/i });

        //Simulamos el cambio
        fireEvent.change(titleInput, { target: { value: 'Nuevo Título', name: 'title' } });

        // Verificamos que la función espía fue llamada
        expect(onChangeSpy).toHaveBeenCalled();
    });
});



//screen.getyRole botón, nunca by text
// const button = screen.getByRole('button',  {name: "Eliminar"})
// expect OnScoreChange.toHaveBeenCalledWith(1);

//en un formulario getByLabelText los input
// const textox = screen.getByLabelText('textbox', {name: "3"})

