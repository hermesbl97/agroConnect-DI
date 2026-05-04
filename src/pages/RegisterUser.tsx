import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerRequest } from "../auth/AuthApi";
import { RegisterRequest } from "../types/Auth";
import { LoadingStatus } from "../components/LoadingStatus";

export default function Register() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Estado LOCAL de carga
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    password: "",
    name: "",
    surname: "",
    email: "",
    telephoneNumber: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { //capturamos los datos
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "telephoneNumber" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Empezamos a cargar

    try {
      await registerRequest(formData);
      navigate("/login");
    } catch (err: any) {
      setError("Error en el registro. Revisa los datos.");
    } finally {
      setLoading(false); // Terminamos de cargar
    }
  };

  if (loading) return <LoadingStatus message="Creando tu cuenta de usuario..." />;

  return (
    <main className="flex-grow flex items-center justify-center px-4 py-12 relative">
      <div className="w-full max-w-2xl bg-white border border-[#E6E6E1] border-t-4 border-t-[#75593e] p-8 relative z-10">
        <header className="mb-8 text-center">
          <div className="mb-4">
            <span className="text-4xl font-serif font-bold text-emerald-900 block">AgroConnect</span>
          </div>
          <h1 className="text-2xl font-serif font-semibold text-zinc-900 mb-2">Crear cuenta en AgroConnect</h1>
          <p className="text-zinc-600">Únete a nuestra red de gestión agrícola avanzada.</p>
        </header>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* IDENTIDAD */}
          <section>
            <h2 className="text-xs font-bold text-[#75593e] border-b border-zinc-200 pb-2 mb-4 uppercase">Identidad</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Username</label>
                <input required name="username" onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none transition-all" type="text" placeholder="jsmith88" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Password</label>
                <input required name="password" onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none transition-all" type="password" placeholder="••••••••" />
              </div>
            </div>
          </section>

          {/* DATOS PERSONALES */}
          <section>
            <h2 className="text-xs font-bold text-[#75593e] border-b border-zinc-200 pb-2 mb-4 uppercase">Información Personal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Nombre</label>
                <input required name="name" onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none transition-all" type="text" placeholder="Jason"/>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Apellidos</label>
                <input required name="surname" onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none transition-all" type="text" placeholder="Smith"/>
              </div>
            </div>
          </section>

          {/* CONTACTO */}
          <section>
            <h2 className="text-xs font-bold text-[#75593e] border-b border-zinc-200 pb-2 mb-4 uppercase">Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Email</label>
                <input required name="email" onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none transition-all" type="email" placeholder="juan@ejemplo.com" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase">Teléfono</label>
                <input required name="telephoneNumber" onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none transition-all" type="tel" placeholder="645897152"/>
              </div>
            </div>
          </section>

          <div className="pt-4">
            <button className="w-full bg-emerald-900 text-white font-bold py-3 hover:bg-emerald-950 transition-all flex items-center justify-center gap-2 uppercase text-sm tracking-widest" type="submit">
              Crear Cuenta
              <span className="material-symbols-outlined text-[18px]">agriculture</span>
            </button>
            <p className="text-center mt-4 text-sm text-zinc-600">
              ¿Ya tienes cuenta? <Link to="/login" className="text-emerald-800 font-bold hover:underline">Accede aquí</Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}