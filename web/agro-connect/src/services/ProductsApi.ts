export async function getProductsRequest(token: string) {
    
        if (!token) {
        throw new Error("No hay una sesión activa.");
    }
    
    const response = await fetch("http://localhost:8088/products", {
        headers: { "Authorization": `Bearer ${token}` }
    });
    
    if (!response.ok) throw new Error("Error al obtener productos");
    
    return await response.json();
}
