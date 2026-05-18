import { Link } from "react-router-dom";
import { RegisterRequest } from "../types/Auth";

// Componente para el formulario de registro de usuario 
interface Props {
  formData: RegisterRequest;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
}

export function RegisterUserForm({ formData, onChange, onSubmit, error }: Props) {
  // Función auxiliar para renderizar cada campo del formulario de manera más limpia y evitar repetición de código
  const renderField = (label: string, name: keyof RegisterRequest, type = "text", placeholder: string) => (
    <div className="space-y-1">
      <label htmlFor={name} className="text-xs font-bold text-zinc-500 uppercase">{label}</label>
      <input
        id={name}
        name={name}
        required
        value={formData[name]}
        onChange={onChange}
        className="w-full bg-zinc-50 border border-zinc-200 py-2 px-3 focus:border-emerald-800 outline-none"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="w-full max-w-2xl bg-white border border-[#E6E6E1] border-t-4 border-t-[#75593e] p-8 shadow-md">
      <header className="mb-8 text-center">
        <span className="text-4xl font-serif font-bold text-emerald-900 block">AgroConnect</span>
        <h1 className="text-2xl font-serif font-semibold text-zinc-900">Crear cuenta</h1>
      </header>

       {/* Si hay un error al registrar el usuario, se muestra un mensaje de error en rojo  */}
      {error && <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">{error}</div>}

      { /* El formulario de registro. Cuando se envía, se llama a la función onSubmit, cuando se modifica un campo,
       se llama a la función onChange y cuando se cancela, se llama a la función onCancel */ }
      <form className="space-y-6" onSubmit={onSubmit}>
        <section>
          <h2 className="text-xs font-bold text-[#75593e] border-b pb-2 mb-4 uppercase">Identidad</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderField("Username", "username", "text", "jsmith88")}
            {renderField("Password", "password", "password", "••••••••")}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold text-[#75593e] border-b pb-2 mb-4 uppercase">Información Personal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderField("Nombre", "name", "text", "Jason")}
            {renderField("Apellidos", "surname", "text", "Smith")}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold text-[#75593e] border-b pb-2 mb-4 uppercase">Contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderField("Email", "email", "email", "juan@ejemplo.com")}
            {renderField("Teléfono", "telephoneNumber", "tel", "645897152")}
          </div>
        </section>

        <div className="pt-4">
          {/* Botón para enviar el formulario de registro */}
          <button className="w-full bg-emerald-900 text-white font-bold py-3 hover:bg-emerald-950 uppercase text-sm tracking-widest shadow-md" type="submit">
            Crear Cuenta
          </button>
          <p className="text-center mt-4 text-sm text-zinc-600">
            ¿Ya tienes cuenta? <Link to="/login" className="text-emerald-800 font-bold hover:underline">Accede aquí</Link>
          </p>
        </div>
      </form>
    </div>
  );
}