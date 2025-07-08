import { useState, useEffect, useCallback } from "react";
import { contactService } from "../../../services/api.service";
import { useAuth } from "../../../hooks/useAuth";
import type { Contact, User } from "../../../types/contacts";
import Swal from "sweetalert2";

export default function ContactsManagement() {
  const { user: currentUser } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<string>("");

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Cálculos para paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  const loadContacts = useCallback(async () => {
    try {
      setLoading(true);
      const response =
        currentUser?.role === "admin"
          ? await contactService.getContacts()
          : await contactService.getMyContacts();

      // Extraer los contactos de la respuesta
      const contactsData = response.data || [];
      setContacts(contactsData);

      // Resetear la página actual si no hay contactos para mostrar
      if (
        contactsData.length <= (currentPage - 1) * itemsPerPage &&
        currentPage > 1
      ) {
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error loading contacts:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los contactos",
      });
    } finally {
      setLoading(false);
    }
  }, [currentUser?.role, currentPage, itemsPerPage]);

  const loadUsers = useCallback(async () => {
    if (currentUser?.role === "admin") {
      try {
        const usersData = await contactService.getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    }
  }, [currentUser?.role]);

  useEffect(() => {
    loadContacts();
    loadUsers();
  }, [loadContacts, loadUsers]);

  const handleAssignContact = async (userId: number) => {
    if (!selectedContact) return;

    try {
      await contactService.assignContact(selectedContact.id, userId);
      Swal.fire({
        icon: "success",
        title: "¡Asignado!",
        text: "Contacto asignado correctamente",
      });
      setShowAssignModal(false);
      setSelectedContact(null);
      loadContacts();
    } catch (error) {
      console.error("Error assigning contact:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo asignar el contacto",
      });
    }
  };

  const handleUpdatePriority = async () => {
    if (!selectedContact || !selectedPriority) return;

    try {
      await contactService.updateContact(selectedContact.id, {
        priority: selectedPriority,
      });

      Swal.fire({
        icon: "success",
        title: "¡Actualizado!",
        text: "Prioridad actualizada correctamente",
      });
      setShowPriorityModal(false);
      setSelectedContact(null);
      setSelectedPriority("");
      loadContacts(); // Recargar para ver los cambios
    } catch (error) {
      console.error("Error updating priority:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar la prioridad",
      });
    }
  };

  const handleDeleteContact = async (contactId: number) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await contactService.deleteContact(contactId);
        Swal.fire({
          icon: "success",
          title: "¡Eliminado!",
          text: "Contacto eliminado correctamente",
        });
        loadContacts();
      } catch (error) {
        console.error("Error deleting contact:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el contacto",
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Gestión de Contactos
            </h2>
            <p className="text-gray-600">
              {currentUser?.role === "admin"
                ? "Administra todos los contactos del sistema"
                : "Gestiona tus contactos asignados"}
            </p>
          </div>
          <div className="text-sm text-gray-500">
            Total: {contacts.length} contactos
          </div>
        </div>
      </div>

      {/* Lista de contactos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Contactos</h3>
        </div>

        {loading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Cargando contactos...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mensaje
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prioridad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {contact.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {contact.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {contact.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {contact.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={contact.priority}
                        onChange={async (e) => {
                          const newPriority = e.target.value;
                          try {
                            await contactService.updateContact(contact.id, {
                              priority: newPriority,
                            });
                            loadContacts();
                          } catch (error) {
                            console.error("Error updating priority:", error);
                            Swal.fire({
                              icon: "error",
                              title: "Error",
                              text: "No se pudo actualizar la prioridad",
                            });
                          }
                        }}
                        className={`text-xs px-2 py-1 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold ${
                          contact.priority === "low"
                            ? "bg-gray-100 text-gray-800"
                            : contact.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        <option value="low">🔵 Baja</option>
                        <option value="medium">🟡 Media</option>
                        <option value="high">🔴 Alta</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(contact.created_at).toLocaleDateString("es-MX")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {(currentUser?.role === "admin" ||
                          contact.assigned_to === currentUser?.id) && (
                          <button
                            onClick={() => handleDeleteContact(contact.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Eliminar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {contacts.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                No hay contactos disponibles
              </div>
            )}
          </div>
        )}

        {/* Paginación */}
        {!loading && contacts.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Mostrando {indexOfFirstItem + 1} a{" "}
                {Math.min(indexOfLastItem, contacts.length)} de{" "}
                {contacts.length} contactos
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>

                {/* Números de página */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 text-sm rounded-md ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de asignación */}
      {showAssignModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Asignar Contacto: {selectedContact.fullName}
            </h3>
            <div className="space-y-3">
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleAssignContact(user.id)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium">{user.username}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </button>
              ))}
            </div>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedContact(null);
                }}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de prioridad */}
      {showPriorityModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Cambiar Prioridad: {selectedContact.fullName}
            </h3>

            {/* Selector de prioridad */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seleccionar Prioridad:
              </label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold ${
                  selectedPriority === "low"
                    ? "bg-gray-50 text-gray-800"
                    : selectedPriority === "medium"
                      ? "bg-yellow-50 text-yellow-800"
                      : selectedPriority === "high"
                        ? "bg-red-50 text-red-800"
                        : "bg-white text-gray-900"
                }`}
              >
                <option value="low" className="bg-gray-50 text-gray-800">
                  🔵 Baja
                </option>
                <option value="medium" className="bg-yellow-50 text-yellow-800">
                  🟡 Media
                </option>
                <option value="high" className="bg-red-50 text-red-800">
                  🔴 Alta
                </option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Prioridad actual:{" "}
                {selectedContact.priority === "low"
                  ? "Baja"
                  : selectedContact.priority === "medium"
                    ? "Media"
                    : "Alta"}
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleUpdatePriority}
                disabled={selectedPriority === selectedContact.priority}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              >
                Actualizar
              </button>
              <button
                onClick={() => {
                  setShowPriorityModal(false);
                  setSelectedContact(null);
                  setSelectedPriority("");
                }}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
