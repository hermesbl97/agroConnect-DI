import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const { login } = useAuth(); //recogemos el perfil del usuario
    const navigate = useNavigate(); //permite redirigir al usuario

    const bodyStyle: React.CSSProperties = {
        backgroundImage: "radial-gradient(#e2e3e1 0.5px, transparent 0.5px)",
        backgroundSize: "24px 24px",
    };

    const handleSubmit = async (e: React.FormEvent) => { //la función se ejecuta al pulsar entrar
        e.preventDefault(); //evita que se recargue la págian
        setErrorMsg(''); //limpia errores anteriores

        try {
            // Enviamos 'username' y 'password' a la API, si todo OK manda a la home loggeado sino error
            await login({ username, password });
            navigate("/"); 
        } catch (err: any) {
            setErrorMsg(err.message || "Credenciales incorrectas");
        }
    };

    return (
        <div style={bodyStyle} className="min-h-screen flex flex-col font-sans text-on-surface relative overflow-hidden">

            <div className="fixed inset-0 -z-10 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-primary-fixed to-transparent blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-gradient-to-tr from-secondary-fixed to-transparent blur-3xl rounded-full"></div>
            </div>

            <main className="flex-grow flex items-center justify-center px-6 py-20">
                <div className="w-full max-w-[480px]">

                    <div className="bg-white border border-surface-variant p-8 md:p-12 rounded-lg shadow-[0_10px_30px_rgba(60,40,30,0.06)]">
                        {/* Header --> Icono + titulo y eslogan  */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="mb-3">
                                <span
                                    className="material-symbols-outlined text-primary text-5xl"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                    potted_plant
                                </span>
                            </div>
                            <h1 className="text-3xl font-serif font-bold text-primary mb-1">AgroConnect</h1>
                            <p className="text-[12px] font-semibold text-secondary uppercase tracking-[0.15em]">
                                Building the difference
                            </p>
                        </div>

                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-serif font-semibold text-on-surface">Acceso a la Plataforma</h2>
                        </div>

                        {errorMsg && (
                            <div className="mb-6 p-3 bg-error-container text-on-error-container border border-error/20 rounded text-sm text-center font-medium">
                                {errorMsg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Campo Usuario (Cambiado de Email a Username) */}
                            <div className="space-y-1">
                                <label className="text-[12px] font-semibold text-on-surface-variant block ml-1 uppercase tracking-wider" htmlFor="username">
                                    USERNAME
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                                        person
                                    </span>
                                    <input
                                        className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                                        id="username"
                                        type="text"
                                        placeholder="Ej: Hermes"
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[12px] font-semibold text-on-surface-variant block ml-1 uppercase tracking-wider" htmlFor="password">
                                    CONTRASEÑA
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                                        lock
                                    </span>
                                    <input
                                        className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                className="w-full bg-primary text-on-primary py-4 rounded font-medium transition-colors flex items-center justify-center gap-2 group"
                                type="submit"
                            >
                                <span>Entrar</span>
                                <span className="material-symbols-outlined text-[20px] translate-x-1 transition-transform">
                                    arrow_forward
                                </span>
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-surface-variant text-center">
                            <p className="text-sm text-on-surface-variant">
                                ¿No tiene una cuenta?{" "}
                                <a className="text-primary font-semibold hover:underline" href="#">
                                    ¡Haz click y Regístrate!
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}