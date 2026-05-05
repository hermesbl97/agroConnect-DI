import { useEffect, useState } from "react";
import { User } from "../types/User";
import { LoadingStatus } from "../components/LoadingStatus";
import { ErrorStatus } from "../components/ErrorStatus";
import { theme } from "../styles/colors";
import { useAuth } from "../auth/AuthContext";
import { getUsersRequest } from "../services/UsersApi";

export default function Users() {
        const { token } = useAuth();
        const [users, setUsers] = useState<User[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");

        // Colores de los badges según el rol 
        const getRoleBadgeStyle = (role: string) => {
                const r = role.toLowerCase();
                if (r.includes("user")) return "bg-emerald-100 text-emerald-800 border border-emerald-200";
                if (r.includes("admin")) return "bg-amber-100 text-amber-800 border border-amber-200";
                if (r.includes("agricultor")) return "bg-purple-100 text-purple-800 border border-purple-200";
                return "bg-blue-100 text-blue-800 border border-blue-200";
        };

        useEffect(() => {

                if (!token) return;

                setLoading(true);

                // Si no hay token, no intentamos la petición 
                getUsersRequest(token)
                        .then((data) => {
                                setUsers(data);
                                setError(""); // Limpiamos errores previos si tiene éxito
                        })
                        .catch((err) => {
                                setError(err.message);
                        })
                        .finally(() => {
                                setLoading(false);
                        });
        }, [token]);

        if (loading) return <LoadingStatus message="Cargando el listado de usuarios..." />;
        if (error) return <ErrorStatus error={error} />;

        return (
                <div style={{ backgroundColor: theme.bg, minHeight: "100vh" }} className="font-sans antialiased">
                        <main className="max-w-7xl mx-auto px-6 py-12">

                                {/* --- Header --- */}
                                <div className="mb-12 border-l-4 pl-6" style={{ borderColor: theme.primary }}>
                                        <h1 className="text-4xl font-serif font-bold mb-2" style={{ color: theme.primary }}>
                                                Gestión de Usuarios
                                        </h1>
                                        <p className="text-lg opacity-80" style={{ color: theme.subtext }}>

                                        </p>
                                </div>

                                {/* ---  TABLA DE DATOS --- */}
                                <div className="bg-white border overflow-hidden shadow-sm rounded-lg" style={{ borderColor: theme.borders }}>
                                        <div className="overflow-x-auto">
                                                <table className="w-full text-left border-collapse">
                                                        <thead>
                                                                <tr className="bg-slate-50 border-b" style={{ borderColor: theme.borders }}>
                                                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Username</th>
                                                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Nombre</th>
                                                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Apellidos</th>
                                                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Rol</th>
                                                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Email</th>
                                                                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Teléfono</th>
                                                                </tr>
                                                        </thead>
                                                        <tbody className="divide-y" style={{ borderColor: theme.borders }}>
                                                                {users.map((user) => ( //Recorremos el array rellenando la tabla
                                                                        <tr className="hover:bg-slate-50 transition-colors group">
                                                                                <td className="px-6 py-5 font-semibold" style={{ color: theme.primary }}>{user.username}</td>
                                                                                <td className="px-6 py-5 text-slate-700">{user.name}</td>
                                                                                <td className="px-6 py-5 text-slate-700">{user.surname}</td>
                                                                                <td className="px-6 py-5">
                                                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter ${getRoleBadgeStyle(user.role)}`}>
                                                                                                {user.role}
                                                                                        </span>
                                                                                </td>
                                                                                <td className="px-6 py-5 text-slate-500">{user.email}</td>
                                                                                <td className="px-6 py-5 text-slate-500 font-medium">{user.telephoneNumber}</td>
                                                                        </tr>
                                                                ))}
                                                        </tbody>
                                                </table>
                                        </div>
                                </div>
                        </main>
                </div>
        );
}