import { JobOffer, JobOfferInDto, JobOfferModifyInDto } from "../types/JobOffer";

export async function getJobOffersRequest(token: string) {
    if (!token) {
        throw new Error("No hay una sesión activa.");
    }

    const response = await fetch("http://localhost:8088/joboffers", {
        headers: { "Authorization": `Bearer ${token}` }
    });

    if (!response.ok) throw new Error("Error al obtener las ofertas de trabajo");

    return await response.json();
}

export async function createJobOfferRequest(token: string | null, payload: JobOfferInDto): Promise<void> {
    if (!token) throw new Error("No hay sesión activa");

    const response = await fetch("http://localhost:8088/joboffers", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("No se pudo publicar la oferta de empleo");
    }
}


export async function updateJobOfferRequest(token: string | null, jobOffer: JobOffer): Promise<void> {
    if (!token) throw new Error("No hay sesión activa");

    // Construimos el objeto siguiendo el contrato del DTO
    const jobOfferDto: JobOfferModifyInDto = {
        title: jobOffer.title,
        description: jobOffer.description,
        location: jobOffer.location,
        startDate: jobOffer.startDate,
        endDate: jobOffer.endDate,
        salary: jobOffer.salary,
        state: jobOffer.state,
        creatorId: jobOffer.creator?.id || 0 // Id del creador o 0 porque podría ser indefinido
    };

    const response = await fetch(`http://localhost:8088/joboffers/${jobOffer.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jobOfferDto)
    });

    if (!response.ok) throw new Error("No se pudieron guardar los cambios");
}

export async function deleteJobOfferRequest(token: string | null, jobOfferId: number): Promise<void> {
    if (!token) throw new Error("No hay sesión activa"); // Seguridad extra

    const response = await fetch(`http://localhost:8088/joboffers/${jobOfferId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("No se pudo eliminar la oferta de empleo");
}