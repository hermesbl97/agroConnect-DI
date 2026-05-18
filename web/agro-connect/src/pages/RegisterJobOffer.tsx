import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { LoadingStatus } from "../components/LoadingStatus";
import { createJobOfferRequest } from "../services/JobOfferApi";
import { JobOfferInDto } from "../types/JobOffer";
import { JobOfferForm } from "../components/JobOfferForm";

export default function RegisterJobOffer() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Esta función se llama cuando el formulario hijo (JobOfferForm) se envía. 
  // Recibe los datos del formulario, les añade el creatorId y hace la petición de creación.
  const handleSubmit = async (formData: Omit<JobOfferInDto, 'creatorId'>) => {
    setError(null);

    // Asegurarnos de que tenemos un usuario logueado con ID válido antes de intentar crear la oferta.
    if (!user || user.id === undefined) {
      setError("Error: No se reconoce tu ID de usuario. Reintenta el login.");
      return;
    }

    setLoading(true);

    try {
      // Construimos el payload completo para la creación de la oferta, incluyendo el creatorId que no viene del formulario.
      const payload: JobOfferInDto = {
        ...formData, // Los datos que vienen del formulario (title, description, location, salary, startDate, endDate)
        creatorId: user.id, //el creatorId se obtiene del contexto de autenticación, no del formulario. 
        // Es el ID del usuario logueado, no un campo que el usuario deba llenar.
      };

      await createJobOfferRequest(token, payload); // Hacemos la petición de creación con el token y el payload completo
      navigate("/joboffers");
    } catch (err: any) {
      setError(err.message || "Error al publicar.");
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

        {/* El formulario de creación de oferta. Le pasamos la función handleSubmit
         que se encargará de recibir los datos del formulario, añadir el creatorId y hacer la petición de creación. */}
        <JobOfferForm onSubmit={handleSubmit} isLoading={loading} />

        <NavLink to="/joboffers" className="block text-center text-xs text-zinc-500 hover:text-emerald-800 font-bold py-4">
          CANCELAR Y VOLVER
        </NavLink>
      </div>
    </main>
  );
}
