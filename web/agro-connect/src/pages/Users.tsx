import { ChangeEvent, useEffect, useState } from "react";
import { User } from "../types/User";
import { LoadingStatus } from "../components/LoadingStatus";
import { ErrorStatus } from "../components/ErrorStatus";
import { theme } from "../styles/colors";
import { useAuth } from "../auth/AuthContext";
import {
  deleteUserRequest,
  getUsersRequest,
  updateUserRequest,
} from "../services/UsersApi";
import { UserComponent } from "../components/UserComponent";

export default function Users() {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);

  //Al entrar en la página tiene lugar la carga de la tabla si tienes autorización
  useEffect(() => {
    if (!token) return;
    setLoading(true);

    getUsersRequest(token)
      .then((data) => {
        setUsers(data);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); //evita que la pagina se recargue
    if (!editingUser) return;
    setLoading(true);
    try {
      await updateUserRequest(token, editingUser);
      // Actualización local. Si el usuario que recorro es el que he editado, pon los nuevos datos del form, sino déjalo como está
      setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)));
      setEditingUser(null);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Lógica para guardar cambios tras editar
  const handleEditChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,) => {
    if (!editingUser) return;
    const { name, value } = e.target;
    setEditingUser({
      ...editingUser,
      [name]: name === "telephoneNumber" ? Number(value) : value,
    });
  };

  const handleDelete = async (userId: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?"))
      return;
    setLoading(true);
    try {
      await deleteUserRequest(token, userId);
      // Actualización local: mantenemos solo los usuarios cuyo ID no coincide con el que hemos eliminado
      setUsers(users.filter((u) => u.id !== userId));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <LoadingStatus message="Cargando el listado de usuarios..." />;
  if (error) return <ErrorStatus error={error} />;

  return (
    <div
      style={{ backgroundColor: theme.bg, minHeight: "100vh" }}
      className="p-6">
      <main className="max-w-7xl mx-auto">
        {/* SECCIÓN DE EDICIÓN (Se muestra si editingUser no es null) */}
        {editingUser ? (
          <div
            style={{
              backgroundColor: theme.navbar,
              borderColor: theme.borders,
            }}
            className="max-w-xl mx-auto p-8 rounded-2xl shadow-xl border"
          >
            <h2
              style={{ color: theme.primary }}
              className="text-2xl font-serif font-bold mb-6 flex items-center gap-2"
            >
              <span className="material-symbols-outlined">manage_accounts</span>
              Modificar Perfil: {editingUser.username}
            </h2>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="space-y-1">
                <label
                  style={{ color: theme.subtext }}
                  className="text-[10px] font-bold uppercase tracking-widest"
                >
                  Rol de Usuario
                </label>
                <select // El campo para modificar el rol del usuario con las opciones de rol disponibles.
                  name="role"
                  value={editingUser.role}
                  onChange={handleEditChange}
                  style={{ borderColor: theme.borders }}
                  className="w-full p-3 bg-zinc-50 border rounded-lg outline-none font-medium"
                >
                  <option value="user">USER (Estándar)</option>
                  <option value="agricultor">
                    AGRICULTOR (Gestión de cultivos)
                  </option>
                  <option value="admin">ADMIN (Control total)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    style={{ color: theme.subtext }}
                    className="text-[10px] font-bold uppercase tracking-widest"
                  >
                    Nombre
                  </label>
                  <input
                    name="name"
                    value={editingUser.name}
                    onChange={handleEditChange}
                    style={{ borderColor: theme.borders }}
                    className="w-full p-3 border rounded-lg bg-zinc-50"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    style={{ color: theme.subtext }}
                    className="text-[10px] font-bold uppercase tracking-widest"
                  >
                    Apellidos
                  </label>
                  <input
                    name="surname"
                    value={editingUser.surname}
                    onChange={handleEditChange}
                    style={{ borderColor: theme.borders }}
                    className="w-full p-3 border rounded-lg bg-zinc-50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  style={{ color: theme.subtext }}
                  className="text-[10px] font-bold uppercase tracking-widest"
                >
                  Email de contacto
                </label>
                <input
                  name="email"
                  value={editingUser.email}
                  onChange={handleEditChange}
                  style={{ borderColor: theme.borders }}
                  className="w-full p-3 border rounded-lg bg-zinc-50"
                />
              </div>
              <div className="space-y-1">
                <label
                  style={{ color: theme.subtext }}
                  className="text-[10px] font-bold uppercase tracking-widest"
                >
                  Número de teléfono
                </label>
                <input
                  name="telephoneNumber"
                  value={editingUser.telephoneNumber}
                  onChange={handleEditChange}
                  style={{ borderColor: theme.borders }}
                  className="w-full p-3 border rounded-lg bg-zinc-50"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="flex-1 py-3 border rounded-lg font-bold hover:bg-zinc-50"
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: theme.primary }}
                  className="flex-[2] py-3 text-white rounded-lg font-bold hover:brightness-110 shadow-lg"
                >
                  GUARDAR CAMBIOS
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* SECCIÓN DE TABLA (Se muestra si no estamos editando) */
          <div
            style={{
              backgroundColor: theme.navbar,
              borderColor: theme.borders,
            }}
            className="rounded-2xl shadow-sm border overflow-hidden"
          >
            <table className="w-full text-left">
              <thead
                style={{ backgroundColor: theme.bg }}
                className="border-b border-zinc-200"
              >
                <tr>
                  <th
                    style={{ color: theme.subtext }}
                    className="px-6 py-4 text-s font-bold uppercase"
                  >
                    Usuario
                  </th>
                  <th
                    style={{ color: theme.subtext }}
                    className="px-6 py-4 text-s font-bold uppercase"
                  >
                    Rol
                  </th>
                  <th
                    style={{ color: theme.subtext }}
                    className="px-6 py-4 text-s font-bold uppercase"
                  >
                    Email
                  </th>
                  <th
                    style={{ color: theme.subtext }}
                    className="px-6 py-4 text-s font-bold uppercase text-right"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {users.map((user) => (
                  // Para cada usuario, renderizamos un UserComponent, pasándole la función setEditingUser para activar
                  // la edición y  borrar el usuario al hacer click
                  <UserComponent
                    key={user.id}
                    user={user}
                    onEdit={setEditingUser} // Le pasamos la función para activar edición
                    onDelete={handleDelete} // Le pasamos la función para borrar
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
