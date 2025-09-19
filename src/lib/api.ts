// Configuração da API e cliente HTTP

import { ApiResponse, PaginatedResponse } from '@/types';

// Configuração base da API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Tipos para configuração de requisições
interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, any>;
}

// Cliente HTTP personalizado
class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Definir token de autenticação
  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Remover token de autenticação
  removeAuthToken() {
    delete this.defaultHeaders['Authorization'];
  }

  // Construir URL com parâmetros
  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      });
    }
    
    return url.toString();
  }

  // Método genérico para fazer requisições
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      params
    } = config;

    const url = this.buildUrl(endpoint, params);
    const requestHeaders = { ...this.defaultHeaders, ...headers };

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return {
        data: data.data || data,
        message: data.message,
        success: true,
      };
    } catch (error) {
      console.error('API Request Error:', error);
      return {
        data: null as any,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        success: false,
      };
    }
  }

  // Métodos HTTP
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  async put<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  async patch<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Método para upload de arquivos
  async upload<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    const headers = { ...this.defaultHeaders };
    delete headers['Content-Type']; // Deixar o browser definir o Content-Type para FormData

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return {
        data: data.data || data,
        message: data.message,
        success: true,
      };
    } catch (error) {
      console.error('Upload Error:', error);
      return {
        data: null as any,
        error: error instanceof Error ? error.message : 'Erro no upload',
        success: false,
      };
    }
  }
}

// Instância global do cliente API
export const apiClient = new ApiClient(API_BASE_URL);

// Utilitários para trabalhar com respostas paginadas
export function createPaginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): PaginatedResponse<T> {
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// Interceptor para lidar com erros de autenticação
export function setupAuthInterceptor(onUnauthorized: () => void) {
  const originalRequest = apiClient['request'];
  
  apiClient['request'] = async function<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const response = await originalRequest.call(this, endpoint, config);
    
    if (!response.success && response.error?.includes('401')) {
      onUnauthorized();
    }
    
    return response as ApiResponse<T>;
  };
}

// Utilitários para cache simples
const cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

export function getCachedData<T>(key: string): T | null {
  const cached = cache.get(key);
  if (!cached) return null;
  
  if (Date.now() - cached.timestamp > cached.ttl) {
    cache.delete(key);
    return null;
  }
  
  return cached.data;
}

export function setCachedData<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });
}

export function clearCache(key?: string): void {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
}

// Função para retry de requisições
export async function retryRequest<T>(
  requestFn: () => Promise<ApiResponse<T>>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<ApiResponse<T>> {
  let lastError: any;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const result = await requestFn();
      if (result.success) {
        return result;
      }
      lastError = result.error;
    } catch (error) {
      lastError = error;
    }
    
    if (i < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
  
  return {
    data: null as any,
    error: lastError || 'Falha após múltiplas tentativas',
    success: false,
  };
}

// Função para batch de requisições
export async function batchRequests<T>(
  requests: (() => Promise<ApiResponse<T>>)[],
  concurrency: number = 5
): Promise<ApiResponse<T>[]> {
  const results: ApiResponse<T>[] = [];
  
  for (let i = 0; i < requests.length; i += concurrency) {
    const batch = requests.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(request => request()));
    results.push(...batchResults);
  }
  
  return results;
}

// Tipos para webhooks
export interface WebhookPayload {
  event: string;
  data: any;
  timestamp: string;
  signature?: string;
}

// Função para verificar assinatura de webhook
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  // Implementação básica - em produção, usar crypto adequado
  const expectedSignature = `sha256=${Buffer.from(payload + secret).toString('base64')}`;
  return signature === expectedSignature;
}

// Configurações de timeout
export const API_TIMEOUTS = {
  DEFAULT: 10000, // 10 segundos
  UPLOAD: 60000,  // 1 minuto
  DOWNLOAD: 30000, // 30 segundos
};

// Status codes comuns
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export default apiClient;