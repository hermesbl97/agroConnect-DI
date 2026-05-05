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