// Utilitários de autenticação

import { User, LoginForm, RegisterForm, AuthContextType } from '@/types';
import { apiClient } from './api';
import { storage } from '@/utils';

// Constantes
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Tipos específicos de autenticação
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

// Classe para gerenciar autenticação
class AuthManager {
  private user: User | null = null;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private refreshPromise: Promise<boolean> | null = null;

  constructor() {
    this.loadFromStorage();
  }

  // Carregar dados do localStorage
  private loadFromStorage(): void {
    this.accessToken = storage.get<string>(TOKEN_KEY);
    this.refreshToken = storage.get<string>(REFRESH_TOKEN_KEY);
    this.user = storage.get<User>(USER_KEY);

    if (this.accessToken) {
      apiClient.setAuthToken(this.accessToken);
    }
  }

  // Salvar dados no localStorage
  private saveToStorage(user: User, tokens: AuthTokens): void {
    storage.set(TOKEN_KEY, tokens.accessToken);
    storage.set(REFRESH_TOKEN_KEY, tokens.refreshToken);
    storage.set(USER_KEY, user);
    
    this.user = user;
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
    
    apiClient.setAuthToken(tokens.accessToken);
  }

  // Limpar dados do localStorage
  private clearStorage(): void {
    storage.remove(TOKEN_KEY);
    storage.remove(REFRESH_TOKEN_KEY);
    storage.remove(USER_KEY);
    
    this.user = null;
    this.accessToken = null;
    this.refreshToken = null;
    
    apiClient.removeAuthToken();
  }

  // Verificar se o token está expirado
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  // Fazer login
  async login(credentials: LoginForm): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      
      if (response.success && response.data) {
        this.saveToStorage(response.data.user, response.data.tokens);
        return { success: true };
      }
      
      return { success: false, error: response.error || 'Erro no login' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro no login' 
      };
    }
  }

  // Fazer registro
  async register(data: RegisterForm): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      
      if (response.success && response.data) {
        this.saveToStorage(response.data.user, response.data.tokens);
        return { success: true };
      }
      
      return { success: false, error: response.error || 'Erro no registro' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro no registro' 
      };
    }
  }

  // Fazer logout
  async logout(): Promise<void> {
    try {
      if (this.refreshToken) {
        await apiClient.post('/auth/logout', { refreshToken: this.refreshToken });
      }
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      this.clearStorage();
    }
  }

  // Renovar token
  async refreshAccessToken(): Promise<boolean> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    if (!this.refreshToken) {
      this.clearStorage();
      return false;
    }

    this.refreshPromise = this.performTokenRefresh();
    const result = await this.refreshPromise;
    this.refreshPromise = null;
    
    return result;
  }

  private async performTokenRefresh(): Promise<boolean> {
    try {
      const response = await apiClient.post<AuthTokens>('/auth/refresh', {
        refreshToken: this.refreshToken
      });

      if (response.success && response.data && this.user) {
        this.saveToStorage(this.user, response.data);
        return true;
      }
      
      this.clearStorage();
      return false;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      this.clearStorage();
      return false;
    }
  }

  // Verificar se está autenticado
  isAuthenticated(): boolean {
    if (!this.accessToken || !this.user) {
      return false;
    }

    if (this.isTokenExpired(this.accessToken)) {
      // Tentar renovar token em background
      this.refreshAccessToken();
      return false;
    }

    return true;
  }

  // Obter usuário atual
  getCurrentUser(): User | null {
    return this.user;
  }

  // Atualizar perfil do usuário
  async updateProfile(data: Partial<User>): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await apiClient.put<User>('/auth/profile', data);
      
      if (response.success && response.data) {
        this.user = response.data;
        storage.set(USER_KEY, this.user);
        return { success: true };
      }
      
      return { success: false, error: response.error || 'Erro ao atualizar perfil' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro ao atualizar perfil' 
      };
    }
  }

  // Solicitar recuperação de senha
  async forgotPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      
      if (response.success) {
        return { success: true };
      }
      
      return { success: false, error: response.error || 'Erro ao solicitar recuperação' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro ao solicitar recuperação' 
      };
    }
  }

  // Redefinir senha
  async resetPassword(token: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await apiClient.post('/auth/reset-password', { token, password });
      
      if (response.success) {
        return { success: true };
      }
      
      return { success: false, error: response.error || 'Erro ao redefinir senha' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro ao redefinir senha' 
      };
    }
  }

  // Verificar email
  async verifyEmail(token: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await apiClient.post('/auth/verify-email', { token });
      
      if (response.success) {
        return { success: true };
      }
      
      return { success: false, error: response.error || 'Erro na verificação' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro na verificação' 
      };
    }
  }

  // Reenviar email de verificação
  async resendVerificationEmail(): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await apiClient.post('/auth/resend-verification');
      
      if (response.success) {
        return { success: true };
      }
      
      return { success: false, error: response.error || 'Erro ao reenviar email' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro ao reenviar email' 
      };
    }
  }

  // Alterar senha
  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await apiClient.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      
      if (response.success) {
        return { success: true };
      }
      
      return { success: false, error: response.error || 'Erro ao alterar senha' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro ao alterar senha' 
      };
    }
  }

  // Login social (Google, Facebook, etc.)
  async socialLogin(provider: string, token: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await apiClient.post<AuthResponse>(`/auth/social/${provider}`, { token });
      
      if (response.success && response.data) {
        this.saveToStorage(response.data.user, response.data.tokens);
        return { success: true };
      }
      
      return { success: false, error: response.error || 'Erro no login social' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro no login social' 
      };
    }
  }

  // Obter sessões ativas
  async getActiveSessions(): Promise<{ success: boolean; data?: unknown[]; error?: string }> {
    try {
      const response = await apiClient.get('/auth/sessions');
      
      if (response.success) {
        return { success: true, data: response.data as unknown[] };
      }
      
      return { success: false, error: response.error || 'Erro ao obter sessões' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro ao obter sessões' 
      };
    }
  }

  // Revogar sessão
  async revokeSession(sessionId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await apiClient.delete(`/auth/sessions/${sessionId}`);
      
      if (response.success) {
        return { success: true };
      }
      
      return { success: false, error: response.error || 'Erro ao revogar sessão' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro ao revogar sessão' 
      };
    }
  }
}

// Instância global do gerenciador de autenticação
export const authManager = new AuthManager();

// Utilitários de validação
export function validateLoginForm(data: LoginForm): string[] {
  const errors: string[] = [];
  
  if (!data.email) {
    errors.push('Email é obrigatório');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Email inválido');
  }
  
  if (!data.password) {
    errors.push('Senha é obrigatória');
  } else if (data.password.length < 6) {
    errors.push('Senha deve ter pelo menos 6 caracteres');
  }
  
  return errors;
}

export function validateRegisterForm(data: RegisterForm): string[] {
  const errors: string[] = [];
  
  if (!data.name) {
    errors.push('Nome é obrigatório');
  } else if (data.name.length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  }
  
  if (!data.email) {
    errors.push('Email é obrigatório');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Email inválido');
  }
  
  if (!data.password) {
    errors.push('Senha é obrigatória');
  } else if (data.password.length < 8) {
    errors.push('Senha deve ter pelo menos 8 caracteres');
  }
  
  if (data.password !== data.confirmPassword) {
    errors.push('Senhas não coincidem');
  }
  
  if (!data.agreeToTerms) {
    errors.push('Você deve aceitar os termos de uso');
  }
  
  return errors;
}

// Middleware para verificar autenticação
export function requireAuth(): boolean {
  return authManager.isAuthenticated();
}

// Middleware para verificar se é host
export function requireHost(): boolean {
  const user = authManager.getCurrentUser();
  return user?.isHost === true;
}

// Middleware para verificar se é admin
export function requireAdmin(): boolean {
  const user = authManager.getCurrentUser();
  return user?.email?.includes('admin') === true; // Implementação básica
}

// Hook personalizado para usar em componentes React
export function useAuth(): AuthContextType {
  return {
    user: authManager.getCurrentUser(),
    isLoading: false, // Implementar loading state se necessário
    login: async (credentials: LoginForm) => {
      const result = await authManager.login(credentials);
      if (!result.success) {
        throw new Error(result.error);
      }
    },
    register: async (data: RegisterForm) => {
      const result = await authManager.register(data);
      if (!result.success) {
        throw new Error(result.error);
      }
    },
    logout: () => authManager.logout(),
    updateProfile: async (data: Partial<User>) => {
      const result = await authManager.updateProfile(data);
      if (!result.success) {
        throw new Error(result.error);
      }
    },
  };
}

export default authManager;