import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth(); // Obtenemos el usuario y la función logout.

  return (
    <header className="bg-white border-b border-[#E6E6E1] sticky top-0 z-40">
      <div className="flex justify-between items-center w-full px-8 max-w-7xl mx-auto h-20">

        {/* Logo */}
        <NavLink to="/">
          <div className="text-2xl font-bold text-emerald-900 font-serif tracking-tight">AgroConnect</div>
        </NavLink>

        {/* Navbar Central */}
        <nav className="hidden md:flex gap-8 items-center">

          {/* Opciones visibles solo si el usuario está logueado (cualquier rol) */}
          {user && (
            <>
              <NavLink className="text-zinc-600 hover:text-emerald-800 font-serif transition-colors" to="/products">
                Productos
              </NavLink>
              <NavLink className="text-zinc-600 hover:text-emerald-800 font-serif transition-colors" to="/joboffers">
                Plataforma de Empleo
              </NavLink>
            </>
          )}

          {/* Opción para Agricultores y Admins */}
          {(user?.role === 'agricultor' || user?.role === 'admin') && (
            <NavLink className="text-zinc-600 hover:text-emerald-800 font-serif transition-colors" to="/#">
              Plantaciones
            </NavLink>
          )}

          {/* Opción exclusiva para Admin */}
          {user?.role === 'admin' && (
            <NavLink className="text-zinc-600 hover:text-emerald-800 font-serif transition-colors" to="/users">
              Usuarios
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              {/* Mostramos nombre y rol para verificar el funcionamiento */}
              <div className="text-right">
                <p className="text-sm font-medium text-zinc-800">Hola, {user.username}</p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm text-red-600 font-semibold hover:bg-red-50 rounded transition-all"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="px-6 py-2 bg-emerald-900 text-white rounded shadow-sm hover:brightness-95 transition-all">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}