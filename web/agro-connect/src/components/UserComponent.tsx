import { User } from "../types/User";
import { theme } from "../styles/colors";

// Componente que representa una fila en la tabla de usuarios. 
// Muestra el nombre, email, rol y tiene botones para editar o eliminar al usuario.
interface Props {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
}

// Recibe un objeto user con la información del usuario, una función onEdit que se llama al hacer click en el botón
// de editar, y una función onDelete que se llama al hacer click en el botón de eliminar.
export function UserComponent({ user, onEdit, onDelete }: Props) {
    // En función del rol del usuario, asignamos una clase de estilo diferente para mostrar un badge de color distinto.
    const getRoleBadgeStyle = (role: string) => {
        const r = role.toLowerCase();
        return theme.roles[r] || theme.roles.default;
    };

    return (
        <tr className="hover:bg-zinc-50/50 transition-colors">
            <td className="px-6 py-4">
                <div style={{ color: theme.primary }} className="font-bold">{user.username}</div>
                <div style={{ color: theme.subtext }} className="text-xs">{user.name} {user.surname}</div>
            </td>
            <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getRoleBadgeStyle(user.role)}`}>
                    {user.role}
                </span>
            </td>
            <td style={{ color: theme.text }} className="px-6 py-4 text-sm">{user.email}</td>
            <td className="px-6 py-4 text-right">
                <button 
                    onClick={() => onEdit(user)} 
                    aria-label={`Editar ${user.username}`}
                    className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg mr-1"
                >
                    <span className="material-symbols-outlined">edit_square</span>
                </button>
                <button 
                    onClick={() => onDelete(user.id)} 
                    aria-label={`Eliminar ${user.username}`}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
                >
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </td>
        </tr>
    );
}