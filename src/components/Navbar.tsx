import { NavLink } from "react-router-dom";

export default function Navbar(){
    return(
      <header className="bg-white border-b border-[#E6E6E1] sticky top-0 z-40">
        <div className="flex justify-between items-center w-full px-8 max-w-7xl mx-auto h-20">
          <div className="text-2xl font-bold text-emerald-900 font-serif tracking-tight">AgroConnect</div>
          <nav className="hidden md:flex gap-8 items-center">
            <NavLink className="text-zinc-600 hover:text-emerald-800 font-serif transition-colors" to= {"/products"}>Productos</NavLink>
            <a className="text-zinc-600 hover:text-emerald-800 font-serif transition-colors" href="#">Plataforma de Empleo</a>
            <a className="text-zinc-600 hover:text-emerald-800 font-serif transition-colors" href="#">Plantaciones</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="px-6 py-2 bg-primary text-on-primary rounded shadow-sm hover:brightness-95 transition-all">
              Área usuario
            </button>
          </div>
        </div>
      </header>

    )
}