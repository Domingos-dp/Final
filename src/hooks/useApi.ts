// Hook personalizado para chamadas de API

"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import type { ApiResponse, PaginatedResponse } from '@/types';

// Tipos para o hook
interface UseApiOptions<T = unknown> {
  immediate?: boolean;
  dependencies?: unknown[];
  onSuccess?: (data: T | null) => void;
  onError?: (error: Error) => void;
  retries?: number;
  retryDelay?: number;
  cache?: boolean;
  cacheKey?: string;
  cacheTTL?: number;
}

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  success: boolean;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: unknown[]) => Promise<T | null>;
  reset: () => void;
  refresh: () => Promise<T | null>;
}

// Cache simples em memória
const apiCache = new Map<string, { data: unknown; timestamp: number; ttl: number }>();

// Função para limpar cache expirado
const cleanExpiredCache = () => {
  const now = Date.now();
  for (const [key, value] of apiCache.entries()) {
    if (now > value.timestamp + value.ttl) {
      apiCache.delete(key);
    }
  }
};

// Hook principal para chamadas de API
export function useApi<T = unknown>(
  apiFunction: (...args: unknown[]) => Promise<ApiResponse<T>>,
  options: UseApiOptions<T> = {}
): UseApiReturn<T> {
  const {
    immediate = false,
    dependencies = [],
    onSuccess,
    onError,
    retries = 0,
    retryDelay = 1000,
    cache = false,
    cacheKey,
    cacheTTL = 5 * 60 * 1000 // 5 minutos
  } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
    success: false
  });

  const lastArgsRef = useRef<unknown[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Função para executar a chamada da API
  const execute = useCallback(
    async (...args: unknown[]): Promise<T | null> => {
      // Cancelar requisição anterior se existir
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Criar novo AbortController
      abortControllerRef.current = new AbortController();
      lastArgsRef.current = args;

      // Verificar cache se habilitado
      if (cache && cacheKey) {
        cleanExpiredCache();
        const cached = apiCache.get(cacheKey);
        if (cached && Date.now() <= cached.timestamp + cached.ttl) {
          setState({
            data: cached.data as T,
            loading: false,
            error: null,
            success: true
          });
          return cached.data as T;
        }
      }

      setState(prev => ({
        ...prev,
        loading: true,
        error: null,
        success: false
      }));

      let attempt = 0;
      const maxAttempts = retries + 1;

      while (attempt < maxAttempts) {
        try {
          const response = await apiFunction(...(args as unknown[]));
          
          // Verificar se a requisição foi cancelada
          if (abortControllerRef.current?.signal.aborted) {
            return null;
          }

          const data = response.data as T;

          // Salvar no cache se habilitado
          if (cache && cacheKey) {
            apiCache.set(cacheKey, {
              data,
              timestamp: Date.now(),
              ttl: cacheTTL
            });
          }

          setState({
            data,
            loading: false,
            error: null,
            success: true
          });

          onSuccess?.(data);
          return data;
        } catch (error) {
          attempt++;
          
          // Verificar se a requisição foi cancelada
          if (abortControllerRef.current?.signal.aborted) {
            return null;
          }

          if (attempt >= maxAttempts) {
            const apiError = error instanceof Error ? error : new Error('Erro desconhecido');
            
            setState({
              data: null,
              loading: false,
              error: apiError,
              success: false
            });

            onError?.(apiError);
            return null;
          }

          // Aguardar antes de tentar novamente
          if (retryDelay > 0) {
            await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
          }
        }
      }

      return null;
    },
    [apiFunction, onSuccess, onError, retries, retryDelay, cache, cacheKey, cacheTTL]
  );

  // Função para resetar o estado
  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setState({
      data: null,
      loading: false,
      error: null,
      success: false
    });
  }, []);

  // Função para atualizar com os últimos argumentos
  const refresh = useCallback(() => {
    return execute(...lastArgsRef.current);
  }, [execute]);

  // Executar imediatamente se solicitado
  useEffect(() => {
    if (immediate) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate, ...dependencies]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    ...state,
    execute,
    reset,
    refresh
  };
}

// Hook para chamadas de API paginadas
export function usePaginatedApi<T = unknown>(
  apiFunction: (page: number, limit: number, ...args: unknown[]) => Promise<ApiResponse<PaginatedResponse<T>>>,
  options: UseApiOptions<PaginatedResponse<T>> & { limit?: number } = {}
) {
  const { limit = 10, ...apiOptions } = options;
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { data, loading, error, success, execute, reset } = useApi<PaginatedResponse<T>>(
    (...args: unknown[]) => apiFunction(args[0] as number, limit, ...(args.slice(1) as unknown[])),
    {
      ...apiOptions,
      onSuccess: (response: PaginatedResponse<T> | null) => {
        if (!response) return;
        if (page === 1) {
          setAllData(response.data);
        } else {
          setAllData(prev => [...prev, ...response.data]);
        }
        setHasMore(response.pagination.page < response.pagination.totalPages);
        apiOptions.onSuccess?.(response);
      }
    }
  );

  const loadMore = useCallback(
    (...args: unknown[]) => {
      if (!loading && hasMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        return execute(nextPage, ...(args as unknown[]));
      }
      return Promise.resolve(null);
    },
    [page, loading, hasMore, execute]
  );

  const resetPagination = useCallback(() => {
    setPage(1);
    setAllData([]);
    setHasMore(true);
    reset();
  }, [reset]);

  const refresh = useCallback(
    (...args: unknown[]) => {
      setPage(1);
      setAllData([]);
      setHasMore(true);
      return execute(1, ...(args as unknown[]));
    },
    [execute]
  );

  return {
    data: allData,
    currentPageData: data?.data || [],
    loading,
    error,
    success,
    page,
    hasMore,
    totalCount: data?.pagination?.total || 0,
    totalPages: data?.pagination?.totalPages || 0,
    execute: (page: number, ...args: unknown[]) => {
      setPage(page);
      return execute(page, ...(args as unknown[]));
    },
    loadMore,
    reset: resetPagination,
    refresh
  };
}

// Hook para múltiplas chamadas de API
export function useMultipleApi<T extends Record<string, unknown>>(
  apis: {
    [K in keyof T]: {
      function: (...args: unknown[]) => Promise<ApiResponse<T[K]>>;
      options?: UseApiOptions<T[K]>;
      args?: unknown[];
    }
  }
) {
  const [states, setStates] = useState<{
    [K in keyof T]: UseApiState<T[K]>
  }>(() => {
    const initialState = {} as { [K in keyof T]: UseApiState<T[K]> };
    Object.keys(apis).forEach(key => {
      initialState[key as keyof T] = {
        data: null,
        loading: false,
        error: null,
        success: false
      };
    });
    return initialState;
  });

  const execute = useCallback(
    async (apiKey?: keyof T) => {
      const keysToExecute = apiKey ? [apiKey] : Object.keys(apis);
      
      const promises = keysToExecute.map(async (key) => {
        const api = apis[key as keyof T];
        
        setStates(prev => ({
          ...prev,
          [key]: { ...prev[key as keyof T], loading: true, error: null }
        }));

        try {
          const response = await api.function(...(api.args || []));
          const data = response.data;

          setStates(prev => ({
            ...prev,
            [key]: {
              data,
              loading: false,
              error: null,
              success: true
            }
          }));

          api.options?.onSuccess?.(data);
          return { key, data, error: null };
        } catch (error) {
          const apiError = error instanceof Error ? error : new Error('Erro desconhecido');
          
          setStates(prev => ({
            ...prev,
            [key]: {
              data: null,
              loading: false,
              error: apiError,
              success: false
            }
          }));

          api.options?.onError?.(apiError);
          return { key, data: null, error: apiError };
        }
      });

      return Promise.all(promises);
    },
    [apis]
  );

  const reset = useCallback(
    (apiKey?: keyof T) => {
      if (apiKey) {
        setStates(prev => ({
          ...prev,
          [apiKey]: {
            data: null,
            loading: false,
            error: null,
            success: false
          }
        }));
      } else {
        const resetState = {} as { [K in keyof T]: UseApiState<T[K]> };
        Object.keys(apis).forEach(key => {
          resetState[key as keyof T] = {
            data: null,
            loading: false,
            error: null,
            success: false
          };
        });
        setStates(resetState);
      }
    },
    [apis]
  );

  // Propriedades computadas
  const loading = Object.values(states).some(state => state.loading);
  const allSuccess = Object.values(states).every(state => state.success);
  const hasError = Object.values(states).some(state => state.error);

  return {
    states,
    loading,
    allSuccess,
    hasError,
    execute,
    reset
  };
}

// Hook para polling (requisições periódicas)
export function usePolling<T = unknown>(
  apiFunction: (...args: unknown[]) => Promise<ApiResponse<T>>,
  interval: number = 5000,
  options: UseApiOptions<T> = {}
) {
  const [isPolling, setIsPolling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const { data, loading, error, success, execute, reset } = useApi(apiFunction, options);

  const startPolling = useCallback(
    (...args: unknown[]) => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      setIsPolling(true);
      
      // Executar imediatamente
      execute(...args);
      
      // Configurar polling
      intervalRef.current = setInterval(() => {
        execute(...args);
      }, interval);
    },
    [execute, interval]
  );

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPolling(false);
  }, []);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    success,
    isPolling,
    execute,
    reset,
    startPolling,
    stopPolling
  };
}

// Hook para upload de arquivos
export function useFileUpload<T = unknown>(
  uploadFunction: (file: File, onProgress?: (progress: number) => void) => Promise<ApiResponse<T>>,
  options: UseApiOptions<T> = {}
) {
  const [progress, setProgress] = useState(0);
  const { data, loading, error, success, execute, reset } = useApi<T>(
    (file: unknown) => uploadFunction(file as File, setProgress),
    options
  );

  const upload = useCallback(
    (file: File) => {
      setProgress(0);
      return execute(file);
    },
    [execute]
  );

  const resetUpload = useCallback(() => {
    setProgress(0);
    reset();
  }, [reset]);

  return {
    data,
    loading,
    error,
    success,
    progress,
    upload,
    reset: resetUpload
  };
}

export default useApi;