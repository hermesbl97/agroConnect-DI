import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { LoadingStatus } from "../components/LoadingStatus";
import { ErrorStatus } from "../components/ErrorStatus";
import { theme } from "../styles/colors";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [query, setQuery] = useState("");
    const [ecosystemFilter, setEcosystemFilter] = useState("all");
    const [sortOrder, setSortOrderProducts] = useState<"asc" | "des">("asc");


    const ecosystemOptions = Array.from(
        new Set(products.map((product) => product.ecosystem)),
    ).sort();

    const ecosystemIcons: Record<string, string> = {
        seco: "wb_sunny",
        polar: "ac_unit",
        tropical: "humidity_low",
        templado: "forest",
        continental: "terrain"
    };

    const normalizedQuery = query.trim().toLowerCase();
    const filteredProducts = products.filter((product) => {

        // Filtrado por Ecosistema
        if (ecosystemFilter !== "all" && product.ecosystem !== ecosystemFilter) {
            return false;
        }

        // Búsqueda por nombre, ecosistema o estación)
        if (!normalizedQuery) return true;
        const searchableText = [product.name, product.ecosystem, product.season]
            .join(" ")
            .toLowerCase();
        return searchableText.includes(normalizedQuery);
    });

    //Ordenación ascendente o descendente
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const comparison = a.name.localeCompare(b.name);
        return sortOrder === "asc" ? comparison : -comparison;
    });

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
        <div style={{ backgroundColor: theme.bg, minHeight: "100vh" }} className="font-sans antialiased">
            <main className="max-w-7xl mx-auto px-6 py-12">

                <header className="mb-8 text-center ">
                    <h1 style={{ color: theme.primary }} className="text-5xl font-serif font-bold mb-3">
                        Catálogo de Semillas
                    </h1>
                </header>

                <div
                    style={{ backgroundColor: theme.navbar, borderColor: theme.borders }}
                    className="mb-8 p-4 rounded-xl border shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between"
                >
                    <div className="flex flex-1 w-full gap-4">
                        {/* Buscador */}
                        <div className="relative flex-1">
                            <span style={{ color: theme.subtext }} className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2">search</span>
                            <input
                                type="text"
                                value={query}
                                onChange={(product) => setQuery(product.target.value)}
                                placeholder="Buscar por nombre, estación o ecosistema..."
                                style={{ borderColor: theme.borders, height: '48px' }}
                                className="w-full pl-11 pr-4 rounded-lg border bg-white focus:ring-2 focus:ring-primary outline-none transition-all text-base"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
                        {/* Filtro de ecosistema */}
                        <select
                            value={ecosystemFilter}
                            onChange={(product) => setEcosystemFilter(product.target.value)}
                            style={{ borderColor: theme.borders, color: theme.text }}
                            className="px-4 py-2 bg-white border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="all">Todas los ecosistemas</option>
                            {ecosystemOptions.map((ecosystem) => (
                                <option key={ecosystem} value={ecosystem}>
                                    {ecosystem}
                                </option>
                            ))}

                        </select>

                        {/* Filtro de orden */}
                        <select
                            value={sortOrder}
                            onChange={(product) => setSortOrderProducts(product.target.value as "asc" | "des")}
                            style={{ borderColor: theme.borders, color: theme.text, height: '48px' }}
                            className="px-4 bg-white border rounded-lg outline-none focus:ring-2 focus:ring-primary min-w-[180px] cursor-pointer"
                        >
                            <option value="asc">Orden: A a la Z</option>
                            <option value="des">Orden: Z a la A</option>
                        </select>
                    </div>
                </div>

                {/* Contador de resultados */}
                <div className="mb-6 text-center">
                    <span style={{ color: theme.subtext }} className="text-sm font-medium uppercase tracking-wider">
                        {sortedProducts.length === 0
                            ? "No se han encontrado resultados para tu búsqueda"
                            : `Se han encontrado ${sortedProducts.length} productos`}
                    </span>
                </div>

                {/* Tarjeta de productos */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedProducts.map((product) => (
                            <article
                                key={product.id}
                                style={{ backgroundColor: theme.navbar, borderColor: theme.borders }}
                                className="group p-6 rounded-2xl border hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <div style={{ backgroundColor: theme.bg, color: theme.primary }}
                                            className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                            {/*  El icono vría en función del ecosistema asociado */}
                                            <span className="material-symbols-outlined text-3xl">
                                                {ecosystemIcons[product.ecosystem.toLowerCase()] || 'potted_plant'}
                                            </span>
                                        </div>
                                        <span style={{ backgroundColor: theme.bg, color: theme.info }} className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-tight">
                                            ID: {product.id}
                                        </span>
                                    </div>
                                    {/* Nombre y descripcion */}
                                    <h2 style={{ color: theme.primary }} className="text-2xl font-serif font-bold mb-3 leading-tight">
                                        {product.name}
                                    </h2>
                                    <p style={{ color: theme.text }} className="text-sm mb-6 leading-relaxed opacity-90 line-clamp-3">
                                        {product.description}
                                    </p>
                                </div>

                                <div style={{ borderTop: `1px solid ${theme.borders}` }} className="grid grid-cols-1 gap-3 pt-5">
                                    {/* Ecosistema */}
                                    <div className="flex items-center gap-3">
                                        <span style={{ color: theme.info }} className="material-symbols-outlined text-xl">public</span>
                                        <span style={{ color: theme.text }} className="text-sm">Ecosistema: <strong>{product.ecosystem}</strong></span>
                                    </div>
                                    {/* Estación */}
                                    <div className="flex items-center gap-3">
                                        <span style={{ color: theme.info }} className="material-symbols-outlined text-xl">calendar_today</span>
                                        <span style={{ color: theme.text }} className="text-sm">Estación: <strong>{product.season}</strong></span>
                                    </div>
                                    {/* Tiempo estimado de cultivo */}
                                    <div className="flex items-center gap-3">
                                        <span style={{ color: theme.info }} className="material-symbols-outlined text-xl">hourglass_empty</span>
                                        <span style={{ color: theme.text }} className="text-sm">Cultivo: <strong>{product.growthEstimatedTime} días</strong></span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Si la API devuelve un array vacío lanza mensaje */}
                    {sortedProducts.length === 0 && (
                        <div className="text-center py-32 rounded-3xl border-2 border-dashed" style={{ borderColor: theme.borders }}>
                            <span className="material-symbols-outlined text-7xl opacity-20 mb-4" style={{ color: theme.text }}>search_off</span>
                            <h3 className="text-xl font-bold mb-1" style={{ color: theme.primary }}>Sin coincidencias</h3>
                            <p style={{ color: theme.subtext }}>No hay resultados para los filtros aplicados.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}