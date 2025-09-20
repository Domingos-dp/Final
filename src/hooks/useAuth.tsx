// Hook personalizado para autenticação

'use client';

import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { User, LoginForm, RegisterForm, AuthContextType } from '@/types';
import { authManager } from '@/lib/auth';
import { toast } from 'sonner';

// Contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider de autenticação
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado ao inicializar
    const currentUser = authManager.getCurrentUser();
    if (currentUser && authManager.isAuthenticated()) {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginForm) => {
    setIsLoading(true);
    try {
      const result = await authManager.login(credentials);
      if (result.success) {
        const currentUser = authManager.getCurrentUser();
        setUser(currentUser);
        toast.success('Login realizado com sucesso!');
      } else {
        throw new Error(result.error || 'Erro no login');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro no login';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      const result = await authManager.register(data);
      if (result.success) {
        const currentUser = authManager.getCurrentUser();
        setUser(currentUser);
        toast.success('Conta criada com sucesso!');
      } else {
        throw new Error(result.error || 'Erro no registro');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro no registro';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authManager.logout();
      setUser(null);
      toast.success('Logout realizado com sucesso!');
    } catch (error) {
      console.error('Erro no logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      const result = await authManager.updateProfile(data);
      if (result.success) {
        const updatedUser = authManager.getCurrentUser();
        setUser(updatedUser);
        toast.success('Perfil atualizado com sucesso!');
      } else {
        throw new Error(result.error || 'Erro ao atualizar perfil');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao atualizar perfil';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto de autenticação
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// Hook para verificar se está autenticado
export function useIsAuthenticated(): boolean {
  const { user } = useAuth();
  return !!user;
}

// Hook para verificar se é host
export function useIsHost(): boolean {
  const { user } = useAuth();
  return user?.isHost === true;
}

// Hook para verificar se é admin
export function useIsAdmin(): boolean {
  const { user } = useAuth();
  // Implementação básica - em produção, usar role-based access
  return user?.email?.includes('admin') === true;
}

// Hook para operações de autenticação adicionais
export function useAuthOperations() {
  const [isLoading, setIsLoading] = useState(false);

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const result = await authManager.forgotPassword(email);
      if (result.success) {
        toast.success('Email de recuperação enviado!');
        return true;
      } else {
        toast.error(result.error || 'Erro ao enviar email');
        return false;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao enviar email';
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authManager.resetPassword(token, password);
      if (result.success) {
        toast.success('Senha redefinida com sucesso!');
        return true;
      } else {
        toast.error(result.error || 'Erro ao redefinir senha');
        return false;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao redefinir senha';
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    try {
      const result = await authManager.verifyEmail(token);
      if (result.success) {
        toast.success('Email verificado com sucesso!');
        return true;
      } else {
        toast.error(result.error || 'Erro na verificação');
        return false;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro na verificação';
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    setIsLoading(true);
    try {
      const result = await authManager.resendVerificationEmail();
      if (result.success) {
        toast.success('Email de verificação reenviado!');
        return true;
      } else {
        toast.error(result.error || 'Erro ao reenviar email');
        return false;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao reenviar email';
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true);
    try {
      const result = await authManager.changePassword(currentPassword, newPassword);
      if (result.success) {
        toast.success('Senha alterada com sucesso!');
        return true;
      } else {
        toast.error(result.error || 'Erro ao alterar senha');
        return false;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao alterar senha';
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogin = async (provider: string, token: string) => {
    setIsLoading(true);
    try {
      const result = await authManager.socialLogin(provider, token);
      if (result.success) {
        toast.success('Login realizado com sucesso!');
        return true;
      } else {
        toast.error(result.error || 'Erro no login social');
        return false;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro no login social';
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerificationEmail,
    changePassword,
    socialLogin,
  };
}

// Hook para gerenciar sessões
export function useAuthSessions() {
  const [sessions, setSessions] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadSessions = async () => {
    setIsLoading(true);
    try {
      const result = await authManager.getActiveSessions();
      if (result.success && result.data) {
        // attempt to coerce into array of objects but keep unknown type safety
        setSessions(Array.isArray(result.data) ? result.data : []);
      }
    } catch (error) {
      console.error('Erro ao carregar sessões:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const revokeSession = async (sessionId: string) => {
    try {
      const result = await authManager.revokeSession(sessionId);
      if (result.success) {
        setSessions(prev => prev.filter(session => {
          // session is unknown — defensively check shape
          if (session && typeof session === 'object' && 'id' in session) {
            // We checked the shape at runtime — assert a narrow type for TS
            type SessionLike = { id: string } & Record<string, unknown>;
            return (session as SessionLike).id !== sessionId;
          }
          return true;
        }));
        toast.success('Sessão revogada com sucesso!');
        return true;
      } else {
        toast.error(result.error || 'Erro ao revogar sessão');
        return false;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao revogar sessão';
      toast.error(message);
      return false;
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  return {
    sessions,
    isLoading,
    loadSessions,
    revokeSession,
  };
}

export default useAuth;