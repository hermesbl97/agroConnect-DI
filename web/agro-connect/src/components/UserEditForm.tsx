import { User } from "../types/User";
import { theme } from "../styles/colors";

// Componente que representa el formulario para editar un usuario. 
interface Props {
    user: User;
    onChange: (user: User) => void;
    onSave: (e: React.FormEvent) => void;
    onCancel: () => void;
}

// Recibe un objeto User con la información del user, una función onChange que se llama cada vez que se modifica un campo 
export function UserEditForm({ user, onChange, onSave, onCancel }: Props) {
    // Cada vez que se modifica un campo del formulario, esta función se encarga de actualizar el objeto user con el nuevo valor
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target; // Obtenemos el nombre del campo que se ha modificado y su nuevo valor
        onChange({
            ...user, // Mantenemos el resto de campos igual
            // Si el campo modificado es el número de teléfono, convertimos el valor a número, sino lo dejamos como string            
            [name]: name === "telephoneNumber" ? Number(value) : value 
        });
    };

    return (
        <div style={{ backgroundColor: theme.navbar, borderColor: theme.borders }} className="max-w-xl mx-auto p-8 rounded-2xl shadow-xl border">
            <h2 style={{ color: theme.primary }} className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">manage_accounts</span>
                Modificar Perfil: {user.username}
            </h2>

            <form onSubmit={onSave} className="space-y-5">
                {/* Campo para modificar el rol del usuario */} 
                <div className="space-y-1">
                    <label style={{ color: theme.subtext }} className="text-[10px] font-bold uppercase tracking-widest">Rol de Usuario</label>
                    <select name="role" value={user.role} onChange={handleChange} className="w-full p-3 bg-zinc-50 border rounded-lg outline-none font-medium">
                        <option value="user">USER (Estándar)</option>
                        <option value="agricultor">AGRICULTOR (Gestión de cultivos)</option>
                        <option value="admin">ADMIN (Control total)</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {/* Campos para modificar el nombre y apellidos del usuario */}
                    <div className="space-y-1">
                        <label style={{ color: theme.subtext }} className="text-[10px] font-bold uppercase tracking-widest">Nombre</label>
                        <input name="name" value={user.name} onChange={handleChange} className="w-full p-3 border rounded-lg bg-zinc-50" />
                    </div>
                    <div className="space-y-1">
                        <label style={{ color: theme.subtext }} className="text-[10px] font-bold uppercase tracking-widest">Apellidos</label>
                        <input name="surname" value={user.surname} onChange={handleChange} className="w-full p-3 border rounded-lg bg-zinc-50" />
                    </div>
                </div>
                {/* Campo para modificar el email del usuario */}
                <div className="space-y-1">
                    <label style={{ color: theme.subtext }} className="text-[10px] font-bold uppercase tracking-widest">Email de contacto</label>
                    <input name="email" value={user.email} onChange={handleChange} className="w-full p-3 border rounded-lg bg-zinc-50" />
                </div>
                {/* Campo para modificar el número de teléfono del usuario */}
                <div className="space-y-1">
                    <label style={{ color: theme.subtext }} className="text-[10px] font-bold uppercase tracking-widest">Número de teléfono</label>
                    <input name="telephoneNumber" value={user.telephoneNumber} onChange={handleChange} className="w-full p-3 border rounded-lg bg-zinc-50" />
                </div>
                    {/* Botones para cancelar o guardar los cambios */}
                <div className="flex gap-3 pt-4">
                    <button type="button" onClick={onCancel} className="flex-1 py-3 border rounded-lg font-bold hover:bg-zinc-50">CANCELAR</button>
                    <button type="submit" style={{ backgroundColor: theme.primary }} className="flex-[2] py-3 text-white rounded-lg font-bold hover:brightness-110 shadow-lg">GUARDAR CAMBIOS</button>
                </div>
            </form>
        </div>
    );
}