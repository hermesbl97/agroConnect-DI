import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { JobOfferCard } from "../components/JobOfferCard";
import { AuthUser } from "../types/Auth";
import { JobOffer } from "../types/JobOffer";

afterEach(() => {
    cleanup();
});

describe("JobOfferCard Component", () => {
    // Datos de prueba tanto User como JobOffer(Mock Data)
    const mockOffer: JobOffer = {
        id: 123,
        title: "Ingeniero Agrónomo",
        description: "Gestión de cultivos hidropónicos",
        location: "Zaragoza",
        salary: 25,
        startDate: "2024-06-01",
        endDate: "2024-09-01",
        state: true,
        creator: { id: 1, username: "admin", role: "admin" } as any
    };

    const mockUser: AuthUser = {
        id: 1,
        username: "admin",
        role: "admin",
        email: "admin@example.com"
    };

    it("debe llamar a onDelete con el ID correcto cuando se pulsa el botón eliminar", () => {
        // 1. Creamos las funciones espía (Mocks)
        const onDeleteSpy = vi.fn();
        const onEditSpy = vi.fn();

        // 2. Renderizamos el componente
        render(
            <JobOfferCard
                jobOffer={mockOffer} //instanciamos los objetos
                user={mockUser}
                onDelete={onDeleteSpy}
                onEdit={onEditSpy}
            />
        );

        // Buscamos el botón de eliminar y simulamos el click
        const deleteButton = screen.getByRole('button', { name: "Eliminar" });
        fireEvent.click(deleteButton);

        // Verificamos que se ha llamado a lafunción eliminar con el Id 123
        expect(onDeleteSpy).toHaveBeenCalledTimes(1);
        expect(onDeleteSpy).toHaveBeenCalledWith(123);
    });

    // Testeamos que se muestra el título y la localización correctamente
    it("debe mostrar el título y la localización correctamente", () => {
        render(
            <JobOfferCard
                jobOffer={mockOffer}
                user={mockUser}
                onDelete={vi.fn()}
                onEdit={vi.fn()}
            />
        );

        // Verificamos que el h3 con el título existe
        expect(screen.getByRole('heading', { level: 3, name: /ingeniero agrónomo/i })).toBeInTheDocument();

        expect(screen.getByText(/zaragoza/i)).toBeDefined();
    });


   

});

