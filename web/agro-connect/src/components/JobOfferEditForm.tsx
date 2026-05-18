import { JobOffer } from "../types/JobOffer";
import { theme } from "../styles/colors";

interface Props {
    offer: JobOffer;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onSave: (e: React.FormEvent) => void;
    onCancel: () => void;
}

export function JobOfferEditForm({ offer, onChange, onSave, onCancel }: Props) {
    return (
        <div style={{ backgroundColor: theme.navbar, borderColor: theme.borders }} className="max-w-2xl mx-auto p-8 rounded-2xl shadow-xl border text-left">
            <h2 style={{ color: theme.primary }} className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">edit_document</span> Editar Oferta
            </h2>
            <form onSubmit={onSave} className="space-y-4">
                <div className="space-y-1">
                    <label htmlFor="edit-title" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Título</label>
                    <input id="edit-title" name="title" value={offer.title} onChange={onChange} className="w-full p-3 border rounded-lg bg-zinc-50" required />
                </div>

                <div className="space-y-1">
                    <label htmlFor="edit-description" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Descripción</label>
                    <textarea id="edit-description" name="description" value={offer.description} onChange={onChange} className="w-full p-3 border rounded-lg bg-zinc-50 min-h-[100px]" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label htmlFor="edit-location" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Ubicación</label>
                        <input id="edit-location" name="location" value={offer.location} onChange={onChange} className="w-full p-3 border rounded-lg bg-zinc-50" />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="edit-salary" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Salario (€/h)</label>
                        <input id="edit-salary" type="number" name="salary" value={offer.salary} onChange={onChange} className="w-full p-3 border rounded-lg bg-zinc-50" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label htmlFor="edit-startDate" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Fecha Inicio</label>
                        <input id="edit-startDate" type="date" name="startDate" value={String(offer.startDate)} onChange={onChange} className="w-full p-3 border rounded-lg bg-zinc-50" />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="edit-endDate" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Fecha Fin</label>
                        <input id="edit-endDate" type="date" name="endDate" value={String(offer.endDate)} onChange={onChange} className="w-full p-3 border rounded-lg bg-zinc-50" />
                    </div>
                </div>

                <div className="space-y-1">
                    <label htmlFor="edit-state" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Estado</label>
                    <select id="edit-state" name="state" value={String(offer.state)} onChange={onChange} className="w-full p-3 border rounded-lg bg-zinc-50 font-bold">
                        <option value="true">ACTIVA</option>
                        <option value="false">CADUCADA</option>
                    </select>
                </div>

                <div className="flex gap-3 pt-6">
                    <button type="button" onClick={onCancel} className="flex-1 py-3 border rounded-lg font-bold">CANCELAR</button>
                    <button type="submit" style={{ backgroundColor: theme.primary }} className="flex-[2] py-3 text-white rounded-lg font-bold">GUARDAR</button>
                </div>
            </form>
        </div>
    );
}