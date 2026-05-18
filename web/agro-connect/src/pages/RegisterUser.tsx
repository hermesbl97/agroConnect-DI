import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerRequest } from "../auth/AuthApi";
import { RegisterRequest } from "../types/Auth";
import { LoadingStatus } from "../components/LoadingStatus";
import { RegisterUserForm } from "../components/RegisterUserForm.tsx";

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
      //  Si el input que está cambiando es el del teléfono conviértelo a Número. Si no, déjalo como texto.
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
    <main className="flex-grow flex items-center justify-center px-4 py-12">
      <RegisterUserForm 
        formData={formData} 
        onChange={handleChange} 
        onSubmit={handleSubmit} 
        error={error} 
      />
    </main>
  );