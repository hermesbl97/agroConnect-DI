import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface Props { 
    allowedRoles?: string[];
} //es opcional y se comprueba si se le pasa el rol, si lo hace lo comprueba y sino comprueba que el usuario esté logeado

export const ProtectedRoute = ({ allowedRoles }: Props) => {
    const { user, token, loading } = useAuth();

    if (loading) return <div>Cargando...</div>;

    // Si no hay token o usuario, al login
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // Si la ruta requiere roles y el usuario no lo tiene, al dashboard o inicio
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />; //da permiso para acceder a la ruta si todo ok
};