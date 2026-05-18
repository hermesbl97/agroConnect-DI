import { JobOfferInDto } from "../types/JobOffer";

// Recibe una función onSubmit que se llamará con los datos del formulario cuando se envíe, 
interface Props {
  onSubmit: (data: Omit<JobOfferInDto, 'creatorId'>) => void;
  isLoading: boolean;
}

export function JobOfferForm({ onSubmit, isLoading }: Props) {
  
    // Recoge los datos del formulario, los transforma al formato esperado y llama a onSubmit con esos datos.
    const internalHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      salary: Number(formData.get("salary")),
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
    });
  };

  return (
    <form className="space-y-6" onSubmit={internalHandleSubmit}>
      {/* Información del puesto */}
      <section>
        <h2 className="text-xs font-bold text-[#75593e] border-b border-zinc-200 pb-2 mb-4 uppercase">Información del puesto</h2>
        <div className="space-y-4">
            {/* Titulo de la oferta */}
          <div className="space-y-1">
            <label htmlFor="title" className="text-xs font-bold text-zinc-500 uppercase">Título del trabajo</label>
            <input id="title" required name="title" className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none" type="text" placeholder="Ej: Recolección de Oliva" />
          </div>
          {/* Descripción de la oferta */}
          <div className="space-y-1">
            <label htmlFor="description" className="text-xs font-bold text-zinc-500 uppercase">Descripción</label>
            <textarea id="description" required name="description" className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none min-h-[100px]" placeholder="Detalla las tareas y requisitos..." />
          </div>
        </div>
      </section>

      {/* Condiciones */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ubicación de la oferta */}
          <div className="space-y-1">
            <label htmlFor="location" className="text-xs font-bold text-zinc-500 uppercase">Localización</label>
            <input id="location" required name="location" className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none" type="text" placeholder="Municipio o zona" />
          </div>
          {/* Salario de la oferta */}
          <div className="space-y-1">
            <label htmlFor="salary" className="text-xs font-bold text-zinc-500 uppercase">Salario (€/h)</label>
            <input id="salary" required name="salary" className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none" type="number" step="0.01" placeholder="10.50" />
          </div>
        </div>
      </section>

      {/* Duración */}
      <section>
        <h2 className="text-xs font-bold text-[#75593e] border-b border-zinc-200 pb-2 mb-4 uppercase">Duración</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="startDate" className="text-xs font-bold text-zinc-500 uppercase">Fecha Inicio</label>
            <input id="startDate" required name="startDate" className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none" type="date" />
          </div>
          <div className="space-y-1">
            <label htmlFor="endDate" className="text-xs font-bold text-zinc-500 uppercase">Fecha Fin</label>
            <input id="endDate" required name="endDate" className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none" type="date" />
          </div>
        </div>
      </section>

        {/* Botón de envío */}
      <button 
        disabled={isLoading}
        className="w-full bg-emerald-900 text-white font-bold py-3 hover:bg-emerald-950 transition-all flex items-center justify-center gap-2 uppercase text-sm tracking-widest shadow-md disabled:opacity-50" 
        type="submit"
      >
        {isLoading ? "Publicando..." : "Publicar Oferta"}
        <span className="material-symbols-outlined text-[18px]">send</span>
      </button>
    </form>
  );
}