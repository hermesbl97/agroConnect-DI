import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { JobOffer } from "../types/JobOffer";
import { getJobOffersRequest } from "../services/JobOfferApi";
import { ErrorStatus } from "../components/ErrorStatus";
import { LoadingStatus } from "../components/LoadingStatus";
import { theme } from "../styles/colors";

export default function JobOffers() {
    const { token, user } = useAuth();
    const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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


    if (loading) return <LoadingStatus message="Cargando el listado de ofertas de trabajo..." />;
    if (error) return <ErrorStatus error={error} />;
    return (
        <div style={{ backgroundColor: theme.bg, minHeight: "80vh" }}>
            {/* Hero Section adaptado con tu theme */}
            <header className="relative h-[250px] overflow-hidden">
                <div className="absolute inset-0 bg-emerald-950/40 z-10">
                    <img alt="Agricultural fields at sunrise" className="absolute inset-0 w-full h-full object-cover" data-alt="A vast, rolling agricultural landscape at golden hour with perfectly aligned crop rows extending toward a distant horizon. The lighting is warm and cinematic, emphasizing the textures of the soil and foliage. The overall aesthetic is professional, grounded, and innovative, utilizing a sophisticated palette of deep forest greens and sun-drenched earth tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWUqEWqHFzryCy_hzjYs8vv7vToujNMSIvAfZCmWKtBIblclGBjiTNrpM53K7jpW4hVr6KfPMxamAtxvcaUpHLuPXzEzaAkDwXS9QBKKKuYf9TT9anGZX9s9Hu8YW-hoK3rostiSNYiMi0wJ0gEkA1JjtvFIiWT0DoFp7nroJh1hUrWba5wowlab27cIwnxcdtHwbG0884m3F7Ug9uzVC6grT8rr9N2WojZ3JInwWVBcf2mE7Fr7-KFpyqzRtb4qlHwAUc5VMMwHY" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
                </div>
                <div className="relative z-20 max-w-7xl mx-auto px-8 h-full flex flex-col justify-center items-center text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg">
                        Cosecha tu Futuro
                    </h1>
                    <p className="font-body-lg text-white/95 max-w-2xl text-lg">
                        Conectamos expertos agrarios con las mejores explotaciones.
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h2 style={{ color: theme.primary }} className="text-3xl font-serif font-bold">Ofertas Disponibles</h2>

                    {/* Solo Agricultores o Admin pueden publicar */}
                    {(user?.role === 'admin' || user?.role === 'agricultor') && (
                        <button style={{ backgroundColor: theme.primary }} className="text-white px-6 py-3 rounded font-bold shadow-lg">
                            Publicar Oferta
                        </button>
                    )}
                </div>

                <div className="grid gap-6">
                    {jobOffers.map((jobOffer) => (
                        <div key={jobOffer.id} style={{ backgroundColor: theme.navbar, borderColor: theme.borders }} className="border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">

                            {/* Icono de Oferta */}
                            <div style={{ backgroundColor: theme.bg }} className="w-20 h-20 flex items-center justify-center rounded-lg">
                                <span className="material-symbols-outlined text-4xl" style={{ color: theme.primary }}>agriculture</span>
                            </div>

                            <div className="flex-grow flex flex-col items-start text-left">
                                <div className="flex justify-between items-start">
                                    <h3 style={{ color: theme.primary }} className="text-xl font-bold">{jobOffer.title}</h3>
                                </div>
                                <p style={{ color: theme.subtext }} className="mt-2 text-sm line-clamp-2">{jobOffer.description}</p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                    <div className="flex items-center gap-2 text-zinc-500">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        <span className="text-xs">{jobOffer.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-500">
                                        <span className="material-symbols-outlined text-sm">payments</span>
                                        <span style={{ color: theme.subtext }} className="text-xs font-bold">{jobOffer.salary}€/hora</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-500">
                                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                                        <span className="text-xs">{jobOffer.startDate} - {jobOffer.endDate}</span>
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
                                        onClick={() => {/* Lógica borrar */ }}
                                        style={{ color: theme.error }}
                                        className="p-2 hover:bg-red-50 rounded"
                                    >
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}