// src/components/JobOfferCard.tsx
import { JobOffer } from "../types/JobOffer";
import { theme } from "../styles/colors";
import { AuthUser } from "../types/Auth";

interface Props {
    jobOffer: JobOffer;
    user: AuthUser | null;
    onEdit: (offer: JobOffer) => void;
    onDelete: (id: number) => void;
}

export function JobOfferCard({ jobOffer, user, onEdit, onDelete }: Props) {
    const canManage = user?.role === 'admin' || user?.id === jobOffer.creator?.id;

    return (
        <div style={{ backgroundColor: theme.navbar, borderColor: theme.borders }}
            className="border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">

            {/* Icono */}
            <div style={{ backgroundColor: theme.bg }} className="w-20 h-20 flex items-center justify-center rounded-lg flex-shrink-0">
                <span className="material-symbols-outlined text-4xl" style={{ color: theme.primary }}>agriculture</span>
            </div>

            {/* Contenido */}
            <div className="flex-grow text-left">
                <h3 style={{ color: theme.primary }} className="text-xl font-bold">{jobOffer.title}</h3>
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

            {/* Acciones */}
            <div className="flex md:flex-col justify-center gap-2">
                {canManage && (
                    <span style={{ color: jobOffer.state ? theme.info : theme.error }} className="px-6 py-2 font-bold text-sm text-center">
                        {jobOffer.state ? "Activa" : "Caducada"}
                    </span>
                )}
                <button style={{ backgroundColor: theme.primary }} className="text-white px-6 py-2 rounded font-bold text-sm">
                    Aplicar
                </button>
                
                {/* Acciones de gestión para el dueño o admin */}
                {canManage && ( 
                    <>
                        <button onClick={() => onEdit(jobOffer)} className="p-2 hover:bg-blue-50 rounded text-sm">Editar</button>
                        <button onClick={() => onDelete(jobOffer.id)} style={{ color: theme.error }} className="p-2 hover:bg-red-50 rounded text-sm">Eliminar</button>
                    </>
                )}
            </div>
        </div>
    );
}