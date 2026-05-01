import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { LoadingStatus } from "../components/LoadingStatus";
import { ErrorStatus } from "../components/ErrorStatus";
import { theme } from "../styles/colors";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const ecosystemIcons: Record<string, string> = {
        seco: "wb_sunny",
        polar: "ac_unit",
        tropical: "humidity_low",
        templado: "forest",
        continental: "terrain"
    };

    useEffect(() => {
        fetch("http://localhost:8088/products")
            .then((r) => r.json())
            .then((data: Product[]) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "No se ha podido cargar la API");
                setLoading(false);
            });
    }, []);

    if (loading) return <LoadingStatus message="Consultando catálogo de semillas..." />;
    if (error) return <ErrorStatus error={error} />;

    return (
        <div style={{ backgroundColor: theme.bg, minHeight: "100vh" }} className="font-sans">
            <main className="max-w-7xl mx-auto px-8 py-12">

                <header className="mb-12">
                    <h1 style={{ color: theme.primary }} className="text-5xl font-serif mb-2 font-bold">
                        Catálogo de Semillas
                    </h1>
                </header>

                {/* Tarjeta de productos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <article
                            key={product.id}
                            className="bg-white p-6 rounded-xl border border-outline-variant hover:shadow-md transition-shadow flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div style={{ backgroundColor: theme.bg, color: theme.primary }} 
                                        className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                                        {/*  El icono vría en función del ecosistema asociado */}
                                        <span className="material-symbols-outlined text-2xl">
                                            {ecosystemIcons[product.ecosystem.toLowerCase()]}
                                        </span>
                                    </div>
                                </div>

                                <h2 style={{ color: theme.primary }} className="text-xl font-serif font-bold text-primary mb-2">
                                    {product.name}
                                </h2>
                                <p style={{ color: theme.text }} className="text-on-surface-variant text-sm mb-4">
                                    {product.description}
                                </p>
                            </div>

                            <div className="space-y-2 pt-4 border-t border-surface-container-highest text-sm">
                                {/* Atributo Ecosistema */}
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm opacity-60">public</span>
                                    <span style={{ color: theme.text }} className="font-medium text-on-surface">Ecosistema: </span>
                                    <span style={{ color: theme.info }} className="capitalize">{product.ecosystem}</span>
                                </div>

                                {/* Estación */}
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm opacity-60">calendar_today</span>
                                    <span style={{ color: theme.text }} className="font-medium text-on-surface">Estación: </span>
                                    <span style={{ color: theme.info }}>{product.season}</span>
                                </div>

                                {/* Tiempo estimado de cultivo */}
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm opacity-60">hourglass_empty</span>
                                    <span style={{ color: theme.text }} className="font-medium text-on-surface">Cultivo: </span>
                                    <span style={{ color: theme.info }}>{product.growthEstimatedTime} días</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Si la API devuelve un array vacío lanza mensaje */}
                {products.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-outline">
                        <p className="text-on-surface-variant">No hay productos disponibles en este momento.</p>
                    </div>
                )}
            </main>
        </div>
    );
}