import { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { JobOffer } from "../types/JobOffer";
import { deleteJobOfferRequest, getJobOffersRequest, updateJobOfferRequest } from "../services/JobOfferApi";
import { ErrorStatus } from "../components/ErrorStatus";
import { LoadingStatus } from "../components/LoadingStatus";
import { theme } from "../styles/colors";
import { NavLink } from "react-router-dom";

export default function JobOffers() {
    const { token, user } = useAuth();
    const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingJobOffer, setEditingJobOffer] = useState<JobOffer | null>(null);

    const [query, setQuery] = useState("");
    const [locationFilter, setLocationFilter] = useState("all");
    const [sortOrder, setSortOrderJobOffer] = useState<"asc" | "des">("asc");
    const [minSalary, setMinSalary] = useState<number>(0);

    const locationOptions = Array.from(
        new Set(jobOffers.map((jobOffer) => jobOffer.location)),
    ).sort();

    const normalizedQuery = query.trim().toLowerCase();
    const filteredJobOffers = jobOffers.filter((jobOffer) => {

        // Filtrado por Localización
        if (locationFilter !== "all" && jobOffer.location !== locationFilter) {
            return false;
        }

        if (jobOffer.salary < minSalary) {
            return false;
        }

        // Búsqueda por titulo, localización o descripción)
        if (!normalizedQuery) return true;
        const searchableText = [jobOffer.title, jobOffer.location, jobOffer.description]
            .join(" ")
            .toLowerCase();
        return searchableText.includes(normalizedQuery);
    });


    //Ordenación ascendente o descendente
    const sortedJobOffers = [...filteredJobOffers].sort((a, b) => {
        const comparison = a.title.localeCompare(b.title);
        return sortOrder === "asc" ? comparison : -comparison;
    });


    //Al entrar en la página tiene lugar la carga de la tabla si tienes autorización 
    useEffect(() => {
        if (!token) return;
        setLoading(true);

        getJobOffersRequest(token)
            .then((data) => {
                setJobOffers(data);
                setError("");
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [token]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault(); //evita que la pagina se recargue
        if (!editingJobOffer) return;
        setLoading(true);
        try {
            await updateJobOfferRequest(token, editingJobOffer);
            // Actualización local. Si el usuario que recorro es el que he editado, pon los nuevos datos del form, sino déjalo como está
            setJobOffers(jobOffers.map(u => u.id === editingJobOffer.id ? editingJobOffer : u));
            setEditingJobOffer(null);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };


    const handleEditChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { //capturamos los datos
        if (!editingJobOffer) return; //si no se ha activado editar una oferta de empleo, abortar función
        const { name, value } = e.target;

        setEditingJobOffer({
            ...editingJobOffer, //hacemos copia de la oferta actual
            [name]: value
        });
    };

    const handleDelete = async (jobOfferId: number) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta oferta de empleo?")) return;
        setLoading(true);

        try {
            await deleteJobOfferRequest(token, jobOfferId);
            // Filtramos la lista localmente para que desaparezca de la tabla
            setJobOffers(jobOffers.filter(u => u.id !== jobOfferId));
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

        // Calcula estos valores antes del return del componente
    const totalJobOffers = jobOffers.length;
    const avgSalary = jobOffers.length > 0
        ? (jobOffers.reduce((acc, p) => acc + Number(p.salary), 0) / jobOffers.length).toFixed(0)
        : 0;
    const locationCount = locationOptions.length;

    if (loading) return <LoadingStatus message="Cargando el listado de ofertas de trabajo..." />;
    if (error) return <ErrorStatus error={error} />;
    return (
        <div style={{ backgroundColor: theme.bg, minHeight: "80vh" }}>
            {/* Solo mostramos el Hero si NO estamos editando */}
            {!editingJobOffer && (
                <header className="relative h-[250px] overflow-hidden">
                    <div className="absolute inset-0 bg-emerald-950/40 z-10">
                        <img alt="Agro" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWUqEWqHFzryCy_hzjYs8vv7vToujNMSIvAfZCmWKtBIblclGBjiTNrpM53K7jpW4hVr6KfPMxamAtxvcaUpHLuPXzEzaAkDwXS9QBKKKuYf9TT9anGZX9s9Hu8YW-hoK3rostiSNYiMi0wJ0gEkA1JjtvFIiWT0DoFp7nroJh1hUrWba5wowlab27cIwnxcdtHwbG0884m3F7Ug9uzVC6grT8rr9N2WojZ3JInwWVBcf2mE7Fr7-KFpyqzRtb4qlHwAUc5VMMwHY" />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
                    </div>
                    <div className="relative z-20 max-w-7xl mx-auto px-8 h-full flex flex-col justify-center items-center text-center">
                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg">Cosecha tu Futuro</h1>
                        <p className="text-white/95 max-w-2xl text-lg">Conectamos expertos agrarios con las mejores explotaciones.</p>
                    </div>
                </header>
            )}

            <main className="max-w-7xl mx-auto px-8 py-12">
                {editingJobOffer ? (
                    /* FORMULARIO DE EDICIÓN */
                    <div style={{ backgroundColor: theme.navbar, borderColor: theme.borders }} className="max-w-2xl mx-auto p-8 rounded-2xl shadow-xl border">
                        <h2 style={{ color: theme.primary }} className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined">edit_document</span>
                            Editar Oferta
                        </h2>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Título de la vacante</label>
                                <input name="title" value={editingJobOffer.title} onChange={handleEditChange} className="w-full p-3 border rounded-lg bg-zinc-50" required />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Descripción</label>
                                <textarea name="description" value={editingJobOffer.description} onChange={handleEditChange as any} className="w-full p-3 border rounded-lg bg-zinc-50 min-h-[100px]" required />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Ubicación</label>
                                    <input name="location" value={editingJobOffer.location} onChange={handleEditChange} className="w-full p-3 border rounded-lg bg-zinc-50" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Salario (€/h)</label>
                                    <input type="number" name="salary" value={editingJobOffer.salary} onChange={handleEditChange} className="w-full p-3 border rounded-lg bg-zinc-50" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Fecha Inicio</label>
                                    <input type="date" name="startDate" value={String(editingJobOffer.startDate)} onChange={handleEditChange} className="w-full p-3 border rounded-lg bg-zinc-50" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Fecha Fin</label>
                                    <input type="date" name="endDate" value={String(editingJobOffer.endDate)} onChange={handleEditChange} className="w-full p-3 border rounded-lg bg-zinc-50" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Estado</label>
                                <select name="state" value={String(editingJobOffer.state)} onChange={handleEditChange} className="w-full p-3 border rounded-lg bg-zinc-50 font-bold">
                                    <option value="true">ACTIVA</option>
                                    <option value="false">CADUCADA</option>
                                </select>
                            </div>

                            <div className="flex gap-3 pt-6">
                                <button type="button" onClick={() => setEditingJobOffer(null)} className="flex-1 py-3 border rounded-lg font-bold hover:bg-zinc-100 transition-colors">
                                    CANCELAR
                                </button>
                                <button type="submit" style={{ backgroundColor: theme.primary }} className="flex-[2] py-3 text-white rounded-lg font-bold hover:brightness-110 shadow-lg">
                                    GUARDAR CAMBIOS
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    /* LISTADO DE OFERTAS */
                    <>
                        <div className="flex justify-between items-center mb-8">
                            <h2 style={{ color: theme.primary }} className="text-3xl font-serif font-bold">Ofertas Disponibles</h2>

                            {/* Solo Agricultores o Admin pueden publicar */}
                            {(user?.role === 'admin' || user?.role === 'agricultor') && (
                                <NavLink to="/registerJobOffer" style={{ backgroundColor: theme.primary }} className="text-white px-6 py-3 rounded font-bold shadow-lg">
                                    Publicar Oferta
                                </NavLink>
                            )}
                        </div>

                        {/* LÓGICA DE DASHBOARD POR ROL */}
                        {(user?.role === 'admin' || user?.role === 'agricultor') && (
                            /* VISTA ADMIN/AGRICULTOR: Se muestran los componentes de resumen */
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <div style={{ backgroundColor: theme.navbar, borderColor: theme.borders }}
                                    className="p-6 rounded-xl border shadow-sm">
                                    <p style={{ color: theme.subtext }} className="text-xs font-bold uppercase tracking-wider">
                                        Número de Ofertas de empleo</p>
                                    <p style={{ color: theme.primary }} className="text-3xl font-bold">{totalJobOffers}</p>
                                </div>
                                <div style={{ backgroundColor: theme.navbar, borderColor: theme.borders }}
                                    className="p-6 rounded-xl border shadow-sm">
                                    <p style={{ color: theme.subtext }} className="text-xs font-bold uppercase tracking-wider">
                                        Número de localizaciones</p>
                                    <p style={{ color: theme.primary }} className="text-3xl font-bold">
                                        {locationCount}</p>
                                </div>
                                <div style={{ backgroundColor: theme.navbar, borderColor: theme.borders }}
                                    className="p-6 rounded-xl border shadow-sm">
                                    <p style={{ color: theme.subtext }} className="text-xs font-bold uppercase tracking-wider">
                                        Salario medio</p>
                                    <p style={{ color: theme.primary }} className="text-3xl font-bold">
                                        {avgSalary} <span className="text-sm font-normal">€/hora</span></p>
                                </div>
                            </div>
                        )}

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
                                        onChange={(jobOffer) => setQuery(jobOffer.target.value)}
                                        placeholder="Buscar por titulo, localización o texto relacionado"
                                        style={{ borderColor: theme.borders, height: '48px' }}
                                        className="w-full pl-11 pr-4 rounded-lg border bg-white focus:ring-2 focus:ring-primary outline-none transition-all text-base"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
                                {/* Filtro de salario minimo */}
                                <div className="relative flex items-center">
                                    <span style={{ color: theme.subtext }} className="material-symbols-outlined absolute left-3 pointer-events-none">payments</span>
                                    <input
                                        type="number"
                                        value={minSalary || ""}
                                        onChange={(e) => setMinSalary(Number(e.target.value))}
                                        placeholder="Salario mín. €/h"
                                        style={{ borderColor: theme.borders, height: '48px' }}
                                        className="pl-10 pr-4 w-full lg:w-40 rounded-lg border bg-white focus:ring-2 focus:ring-primary outline-none transition-all text-sm"
                                    />
                                </div>
                                {/* Filtro de loalización */}
                                <select
                                    value={locationFilter}
                                    onChange={(jobOffer) => setLocationFilter(jobOffer.target.value)}
                                    style={{ borderColor: theme.borders, color: theme.text }}
                                    className="px-4 py-2 bg-white border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="all">Todas los ecosistemas</option>
                                    {locationOptions.map((location) => (
                                        <option key={location} value={location}>
                                            {location}
                                        </option>
                                    ))}

                                </select>

                                {/* Filtro de orden */}
                                <select
                                    value={sortOrder}
                                    onChange={(jobOffer) => setSortOrderJobOffer(jobOffer.target.value as "asc" | "des")}
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
                                {sortedJobOffers.length === 0
                                    ? "No se han encontrado resultados para tu búsqueda"
                                    : `Se han encontrado ${sortedJobOffers.length} productos`}
                            </span>
                        </div>

                        <div className="grid gap-6">
                            {sortedJobOffers.map((jobOffer) => (
                                <div key={jobOffer.id} style={{ backgroundColor: theme.navbar, borderColor: theme.borders }} className="border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">

                                    {/* Icono de Oferta */}
                                    <div style={{ backgroundColor: theme.bg }} className="w-20 h-20 flex items-center justify-center rounded-lg">
                                        <span className="material-symbols-outlined text-4xl" style={{ color: theme.primary }}>agriculture</span>
                                    </div>

                                    <div className="flex-grow flex flex-col items-start text-left">
                                        <div className="flex justify-between items-start">
                                            <h3 style={{ color: theme.primary }} className="text-xl font-bold">{jobOffer.title}</h3>
                                        </div>
                                        <p style={{ color: theme.subtext }} className="mt-2 text-m line-clamp-2">{jobOffer.description}</p>

                                        <div className="flex flex-wrap items-center gap-x-12 gap-y-4 mt-8 w-full border-t border-zinc-100 pt-6">
                                            <div className="flex items-center gap-3 text-zinc-600">
                                                <span className="material-symbols-outlined text-m text-emerald-600">location_on</span>
                                                <span className="text-sm font-semibold uppercase tracking-wide">{jobOffer.location}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-zinc-600">
                                                <span className="material-symbols-outlined text-m text-emerald-600">payments</span>
                                                <span style={{ color: theme.primary }} className="text-lg font-black">{jobOffer.salary}€/h</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-zinc-600">
                                                <span className="material-symbols-outlined text-m text-emerald-600">calendar_month</span>
                                                <span className="text-sm font-semibold">{jobOffer.startDate} — {jobOffer.endDate}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex md:flex-col justify-center gap-2">
                                        {/* Solo el dueño o Admin pueden ver el estado de las ofertas */}
                                        {(user?.role === 'admin' || user?.id === jobOffer.creator?.id) && (
                                            <span
                                                style={{ color: jobOffer.state ? theme.info : theme.error }}
                                                className="text-[10px] font-bold uppercase tracking-widest  px-6 py-2 rounded font-bold text-sm">
                                                {jobOffer.state ? "Activa" : "Caducada"}
                                            </span>)}

                                        <button style={{ backgroundColor: theme.primary }} className="text-white px-6 py-2 rounded font-bold text-sm">
                                            Aplicar
                                        </button>

                                        {/* Acciones de gestión para el dueño o admin */}
                                        {(user?.role === 'admin' || user?.id === jobOffer.creator?.id) && (
                                            <button
                                                onClick={() => setEditingJobOffer(jobOffer)}
                                                className="p-2 hover:bg-blue-50 rounded">
                                                Editar
                                            </button>
                                        )}    {(user?.role === 'admin' || user?.id === jobOffer.creator?.id) && (
                                            <button
                                                onClick={() => handleDelete(jobOffer.id)}
                                                style={{ color: theme.error }}
                                                className="p-2 hover:bg-red-50 rounded">
                                                Eliminar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
} 