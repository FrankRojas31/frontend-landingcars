import apiClient from "../api/ApiClient";
import type {
  Contact,
  ContactResponse,
  ContactSingleResponse,
  ContactQueryParams,
  DashboardStats,
  ContactUpdateData,
  User,
  Message,
  UserCreateData,
  UserUpdateData,
} from "../types/contacts";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token?: string;
    user?: User;
  };
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

class AuthService {
  private token: string | null = null;

  constructor() {
    // No cargar automáticamente desde localStorage aquí
    // Zustand manejará la persistencia
  }

  // Método para configurar el token internamente (usado por Zustand)
  setInternalToken(token: string | null) {
    this.token = token;
    if (token) {
      apiClient.setAuthToken(token);
    } else {
      apiClient.clearAuthToken();
    }
  }

  // Método para limpiar el token internamente (usado por Zustand)
  clearInternalToken() {
    this.token = null;
    apiClient.clearAuthToken();
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Mock response
    const mockToken = "mock_token_" + credentials.username + "_" + Date.now();
    const mockUser: User = {
      id: 1,
      username: credentials.username,
      email: credentials.username + "@example.com",
      role: "admin",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.token = mockToken;
    apiClient.setAuthToken(this.token);

    return {
      success: true,
      message: "Login exitoso",
      data: {
        token: mockToken,
        user: mockUser,
      },
    };
  }

  async logout(): Promise<void> {
    try {
      if (this.token) {
        // Llamar al endpoint de logout del backend
        await apiClient.post("auth/logout");
      }
    } catch (error: unknown) {
      console.error("Logout error:", error);
      // No lanzar error en logout, siempre limpiar el token local
    } finally {
      this.token = null;
      apiClient.clearAuthToken();
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      if (!this.token) {
        return null;
      }

      const response = await apiClient.get<User>("auth/me");
      return response.data;
    } catch (error: unknown) {
      console.error("Get current user error:", error);

      // Manejar errores específicos del backend Flask
      if (error && typeof error === "object" && "status" in error) {
        const apiError = error as { status: number };

        if (apiError.status === 401) {
          // Token expirado o inválido
          throw new Error("Sesión expirada");
        }
      }

      throw error; // No limpiar la sesión aquí, dejar que Zustand lo maneje
    }
  }

  async forgotPassword(
    identifier: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
      }>("auth/forgot-password", {
        identifier,
      });
      return response.data;
    } catch (error: unknown) {
      console.error("Forgot password error:", error);

      // Manejar errores específicos del backend Flask
      if (error && typeof error === "object" && "status" in error) {
        const apiError = error as { status: number; data?: string };

        if (apiError.status === 404) {
          throw new Error("Usuario no encontrado");
        } else if (apiError.status === 400) {
          try {
            const errorData =
              typeof apiError.data === "string"
                ? JSON.parse(apiError.data)
                : apiError.data;
            throw new Error(
              (errorData as { message?: string }).message || "Datos inválidos",
            );
          } catch {
            throw new Error("Datos inválidos");
          }
        }
      }

      throw error;
    }
  }

  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
      }>("auth/reset-password", {
        token,
        new_password: newPassword, // El backend espera 'new_password'
      });
      return response.data;
    } catch (error: unknown) {
      console.error("Reset password error:", error);

      // Manejar errores específicos del backend Flask
      if (error && typeof error === "object" && "status" in error) {
        const apiError = error as { status: number; data?: string };

        if (apiError.status === 400) {
          try {
            const errorData =
              typeof apiError.data === "string"
                ? JSON.parse(apiError.data)
                : apiError.data;
            const errorMsg = (errorData as { message?: string }).message;

            if (
              errorMsg?.includes("expired") ||
              errorMsg?.includes("invalid")
            ) {
              throw new Error(
                "El token de recuperación ha expirado o es inválido",
              );
            }

            throw new Error(errorMsg || "Datos inválidos");
          } catch {
            throw new Error(
              "El token de recuperación ha expirado o es inválido",
            );
          }
        }
      }

      throw error;
    }
  }

  // Método legacy - mantener para compatibilidad
  getStoredUser(): User | null {
    // Ya no usamos localStorage directamente, Zustand maneja esto
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }

  // Método legacy - mantener para compatibilidad
  hasValidToken(): boolean {
    return !!this.token;
  }
}

class ContactService {
  async submitContact(
    _formData: ContactFormData,
  ): Promise<{ success: boolean; message: string }> {
    // Mock response
    return Promise.resolve({
      success: true,
      message: "Mensaje enviado correctamente",
    });
  }

  async getContacts(_params?: ContactQueryParams): Promise<ContactResponse> {
    // Mock response
    const mockContacts: Contact[] = [
      {
        id: 1,
        fullName: "Juan Pérez",
        email: "juan@example.com",
        phone: "5512345678",
        message: "Interesado en camioneta tipo pickup",
        status: "No Atendido",
        priority: "high",
        source: "website",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 2,
        fullName: "María García",
        email: "maria@example.com",
        phone: "5587654321",
        message: "Consulta sobre financiamiento",
        status: "En Espera",
        priority: "medium",
        source: "website",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    return Promise.resolve({
      success: true,
      data: mockContacts,
      pagination: {
        page: 1,
        limit: 10,
        total: 2,
        totalPages: 1,
      },
    });
  }

  async getMyContacts(_params?: ContactQueryParams): Promise<ContactResponse> {
    // Mock response
    const mockContacts: Contact[] = [
      {
        id: 1,
        fullName: "Juan Pérez",
        email: "juan@example.com",
        phone: "5512345678",
        message: "Interesado en camioneta tipo pickup",
        status: "No Atendido",
        priority: "high",
        source: "website",
        assigned_to: 1,
        assigned_username: "admin",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    return Promise.resolve({
      success: true,
      data: mockContacts,
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
    });
  }

  async getContactById(id: number): Promise<Contact> {
    // Mock response
    return Promise.resolve({
      id,
      fullName: "Juan Pérez",
      email: "juan@example.com",
      phone: "5512345678",
      message: "Interesado en camioneta tipo pickup",
      status: "No Atendido",
      priority: "high",
      source: "website",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  async updateContact(id: number, data: ContactUpdateData): Promise<Contact> {
    // Mock response
    return Promise.resolve({
      id,
      fullName: "Juan Pérez",
      email: "juan@example.com",
      phone: "5512345678",
      message: "Interesado en camioneta tipo pickup",
      status:
        (data.status as "No Atendido" | "En Espera" | "Atendido" | "Enviado") ||
        "No Atendido",
      priority: (data.priority as any) || "high",
      source: "website",
      notes: data.notes,
      assigned_to: data.assigned_to,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  async deleteContact(
    id: number,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.delete<{
        success: boolean;
        message: string;
      }>(`contacts/${id}`);
      return response.data;
    } catch (error) {
      console.error("Delete contact error:", error);
      throw error;
    }
  }

  async assignContact(contactId: number, userId: number): Promise<Contact> {
    try {
      const response = await apiClient.put<ContactSingleResponse>(
        `contacts/${contactId}/assign`,
        {
          assigned_to: userId,
        },
      );
      return response.data.data;
    } catch (error) {
      console.error("Assign contact error:", error);
      throw error;
    }
  }

  async sendFollowUpEmail(
    contactId: number,
    customMessage?: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
      }>(`contacts/${contactId}/follow-up`, {
        customMessage,
      });
      return response.data;
    } catch (error) {
      console.error("Send follow up email error:", error);
      throw error;
    }
  }

  async getDashboardStats(): Promise<DashboardStats> {
    // Mock response
    return Promise.resolve({
      totalContacts: 10,
      contactsByStatus: {
        "No Atendido": 4,
        "En Espera": 3,
        Atendido: 2,
        Enviado: 1,
      },
      contactsByPriority: {
        low: 2,
        medium: 4,
        high: 4,
      },
      recentContacts: [
        {
          id: 1,
          fullName: "Juan Pérez",
          email: "juan@example.com",
          phone: "5512345678",
          message: "Interesado en pickup",
          status: "No Atendido",
          priority: "high",
          source: "website",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      monthlyStats: [
        { month: "Enero", count: 5 },
        { month: "Febrero", count: 8 },
        { month: "Marzo", count: 10 },
      ],
    });
  }

  async getUsers(): Promise<User[]> {
    try {
      const response = await apiClient.get<{ success: boolean; data: User[] }>(
        "auth/users",
      );
      return response.data.data;
    } catch (error) {
      console.error("Get users error:", error);
      throw error;
    }
  }
}

class DashboardService {
  async getStats(): Promise<DashboardStats> {
    // Mock response
    return Promise.resolve({
      totalContacts: 10,
      contactsByStatus: {
        "No Atendido": 4,
        "En Espera": 3,
        Atendido: 2,
        Enviado: 1,
      },
      contactsByPriority: {
        low: 2,
        medium: 4,
        high: 4,
      },
      recentContacts: [
        {
          id: 1,
          fullName: "Juan Pérez",
          email: "juan@example.com",
          phone: "5512345678",
          message: "Interesado en pickup",
          status: "No Atendido",
          priority: "high",
          source: "website",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      monthlyStats: [
        { month: "Enero", count: 5 },
        { month: "Febrero", count: 8 },
        { month: "Marzo", count: 10 },
      ],
    });
  }
}

class MessagesService {
  async getUnreadCount(): Promise<{ count: number }> {
    // Mock response
    return Promise.resolve({ count: 5 });
  }

  async getContactMessages(contactId: number): Promise<Message[]> {
    // Mock response
    const mockMessages: Message[] = [
      {
        id: 1,
        contactId: contactId,
        contact: {
          id: contactId,
          fullName: "Juan Pérez",
          email: "juan@example.com",
        },
        content:
          "Hola, quisiera saber más sobre las opciones de financiamiento",
        isRead: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        contactId: contactId,
        contact: {
          id: contactId,
          fullName: "Juan Pérez",
          email: "juan@example.com",
        },
        content: "Claro, tenemos varias opciones disponibles",
        isRead: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    return Promise.resolve(mockMessages);
  }

  async createMessage(contactId: number, message: string): Promise<Message> {
    // Mock response
    return Promise.resolve({
      id: Math.floor(Math.random() * 1000),
      contactId: contactId,
      contact: {
        id: contactId,
        fullName: "Juan Pérez",
        email: "juan@example.com",
      },
      content: message,
      isRead: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  async markAsRead(
    _contactId: number,
  ): Promise<{ success: boolean; message: string }> {
    // Mock response
    return Promise.resolve({
      success: true,
      message: "Mensajes marcados como leído",
    });
  }

  async updateMessage(id: number, message: string): Promise<Message> {
    // Mock response
    return Promise.resolve({
      id,
      contactId: 1,
      contact: {
        id: 1,
        fullName: "Juan Pérez",
        email: "juan@example.com",
      },
      content: message,
      isRead: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  async deleteMessage(
    _id: number,
  ): Promise<{ success: boolean; message: string }> {
    // Mock response
    return Promise.resolve({
      success: true,
      message: "Mensaje eliminado",
    });
  }
}

class UsersService {
  async createUser(userData: UserCreateData): Promise<User> {
    try {
      const response = await apiClient.post<{ success: boolean; data: User }>(
        "auth/users",
        userData,
      );
      return response.data.data;
    } catch (error) {
      console.error("Create user error:", error);
      throw error;
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const response = await apiClient.get<{ success: boolean; data: User[] }>(
        "auth/users",
      );
      return response.data.data;
    } catch (error) {
      console.error("Get users error:", error);
      throw error;
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const response = await apiClient.get<{ success: boolean; data: User }>(
        `auth/users/${id}`,
      );
      return response.data.data;
    } catch (error) {
      console.error("Get user by ID error:", error);
      throw error;
    }
  }

  async updateUser(id: number, userData: UserUpdateData): Promise<User> {
    try {
      const response = await apiClient.put<{ success: boolean; data: User }>(
        `auth/users/${id}`,
        userData,
      );
      return response.data.data;
    } catch (error) {
      console.error("Update user error:", error);
      throw error;
    }
  }

  async deleteUser(id: number): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.delete<{
        success: boolean;
        message: string;
      }>(`auth/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Delete user error:", error);
      throw error;
    }
  }
}

// Instancias de los servicios
export const authService = new AuthService();
export const contactService = new ContactService();
export const dashboardService = new DashboardService();
export const messagesService = new MessagesService();
export const usersService = new UsersService();

export default {
  auth: authService,
  contact: contactService,
  dashboard: dashboardService,
  messages: messagesService,
  users: usersService,
};
