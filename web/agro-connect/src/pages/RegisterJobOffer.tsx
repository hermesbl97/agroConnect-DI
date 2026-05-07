import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { LoadingStatus } from "../components/LoadingStatus";
import { createJobOfferRequest } from "../services/JobOfferApi";
import { JobOfferInDto } from "../types/JobOffer";

export default function RegisterJobOffer() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inicializamos 
  const [formData, setFormData] = useState<Omit<JobOfferInDto, 'creatorId'>>({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    salary: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      // Conversión numérica para el salario
      [name]: name === "salary" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    console.log("Usuario actual en sesión:", user);


    // la API dará error 404 (User Not Found)
    if (!user || user.id === undefined) {
      setError("Error: No se reconoce tu ID de usuario. Reintenta el login.");
      return;
    }

    setLoading(true);

    try {

      const payload: JobOfferInDto = {
        ...formData,
        creatorId: user.id,
      };

      console.log("Enviando a la API:", payload);

      await createJobOfferRequest(token, payload);
      navigate("/joboffers");
    } catch (err: any) {
      setError(err.message || "Error al publicar. ¿Existe el usuario ID " + user.id + "?");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingStatus message="Publicando tu oferta de empleo..." />;

  return (
    <main className="flex-grow flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white border border-[#E6E6E1] border-t-4 border-t-[#75593e] p-8 shadow-sm">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-serif font-semibold text-zinc-900 mb-2">Nueva Vacante</h1>
          <p className="text-zinc-600">Publica una oferta para encontrar trabajadores agrícolas.</p>
        </header>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* DETALLES PRINCIPALES */}
          <section>
            <h2 className="text-xs font-bold text-[#75593e] border-b border-zinc-200 pb-2 mb-4 uppercase">Información del puesto</h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Título del trabajo</label>
                <input required name="title" onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none" type="text" placeholder="Ej: Recolección de Oliva" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Descripción</label>
                <textarea required name="description" onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none min-h-[100px]" placeholder="Detalla las tareas y requisitos..." />
              </div>
            </div>
          </section>

          {/* CONDICIONES */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Ubicación</label>
                <input required name="location" onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none" type="text" placeholder="Municipio o zona" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Salario (€/h)</label>
                <input required name="salary" onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none" type="number" step="0.01" placeholder="10.50" />
              </div>
            </div>
          </section>

          {/* FECHAS */}
          <section>
            <h2 className="text-xs font-bold text-[#75593e] border-b border-zinc-200 pb-2 mb-4 uppercase">Duración</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Fecha Inicio</label>
                <input required name="startDate" onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none" type="date" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Fecha Fin</label>
                <input required name="endDate" onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none" type="date" />
              </div>
            </div>
          </section>

          <div className="pt-4 flex flex-col gap-3">
            <button className="w-full bg-emerald-900 text-white font-bold py-3 hover:bg-emerald-950 transition-all flex items-center justify-center gap-2 uppercase text-sm tracking-widest shadow-md" type="submit">
              Publicar Oferta
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
            <NavLink to="/joboffers" className="text-center text-xs text-zinc-500 hover:text-emerald-800 font-bold py-2">
              CANCELAR Y VOLVER
            </NavLink>
          </div>
        </form>
      </div>
    </main>
  );
}