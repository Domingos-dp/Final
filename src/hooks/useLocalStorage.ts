// Hook personalizado para localStorage

'use client';

import { useState, useEffect, useCallback } from 'react';

// Tipo para o hook
type SetValue<T> = T | ((val: T) => T);

// Hook principal
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void, () => void] {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erro ao ler localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Função para definir valor
  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Erro ao definir localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Função para remover valor
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Erro ao remover localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

// Hook para múltiplas chaves do localStorage
export function useMultipleLocalStorage<T extends Record<string, unknown>>(
  keys: (keyof T)[],
  initialValues: T
): [T, (key: keyof T, value: SetValue<T[keyof T]>) => void, (key: keyof T) => void] {
  const [values, setValues] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValues;
    }

    const result = { ...initialValues };
    keys.forEach(key => {
      try {
        const item = window.localStorage.getItem(String(key));
        if (item) {
          result[key] = JSON.parse(item);
        }
      } catch (error) {
        console.error(`Erro ao ler localStorage key "${String(key)}":`, error);
      }
    });
    return result;
  });

  const setValue = useCallback(
    (key: keyof T, value: SetValue<T[keyof T]>) => {
      try {
        const valueToStore = value instanceof Function ? value(values[key]) : value;
        setValues(prev => ({ ...prev, [key]: valueToStore }));
        
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(String(key), JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Erro ao definir localStorage key "${String(key)}":`, error);
      }
    },
    [values]
  );

  const removeValue = useCallback(
    (key: keyof T) => {
      try {
        setValues(prev => ({ ...prev, [key]: initialValues[key] }));
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(String(key));
        }
      } catch (error) {
        console.error(`Erro ao remover localStorage key "${String(key)}":`, error);
      }
    },
    [initialValues]
  );

  return [values, setValue, removeValue];
}

// Hook para localStorage com expiração
export function useLocalStorageWithExpiry<T>(
  key: string,
  initialValue: T,
  ttl: number = 24 * 60 * 60 * 1000 // 24 horas por padrão
): [T, (value: SetValue<T>) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }

      const parsedItem = JSON.parse(item);
      const now = new Date().getTime();
      
      if (parsedItem.expiry && now > parsedItem.expiry) {
        window.localStorage.removeItem(key);
        return initialValue;
      }
      
      return parsedItem.value || initialValue;
    } catch (error) {
      console.error(`Erro ao ler localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        
        if (typeof window !== 'undefined') {
          const now = new Date().getTime();
          const item = {
            value: valueToStore,
            expiry: now + ttl
          };
          window.localStorage.setItem(key, JSON.stringify(item));
        }
      } catch (error) {
        console.error(`Erro ao definir localStorage key "${key}":`, error);
      }
    },
    [key, storedValue, ttl]
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Erro ao remover localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

// Hook para sincronizar localStorage entre abas
export function useSyncedLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erro ao ler localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          // Disparar evento customizado para sincronizar entre abas
          window.dispatchEvent(new CustomEvent('local-storage', {
            detail: { key, value: valueToStore }
          }));
        }
      } catch (error) {
        console.error(`Erro ao definir localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        window.dispatchEvent(new CustomEvent('local-storage', {
          detail: { key, value: null }
        }));
      }
    } catch (error) {
      console.error(`Erro ao remover localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Escutar mudanças do localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Erro ao sincronizar localStorage key "${key}":`, error);
        }
      }
    };

    const handleCustomEvent = (e: CustomEvent) => {
      if (e.detail.key === key) {
        setStoredValue(e.detail.value || initialValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', handleCustomEvent as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleCustomEvent as EventListener);
    };
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

// Hook para localStorage com validação
export function useValidatedLocalStorage<T>(
  key: string,
  initialValue: T,
  validator: (value: unknown) => value is T
): [T, (value: SetValue<T>) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }

      const parsedItem = JSON.parse(item);
      if (validator(parsedItem)) {
        return parsedItem;
      } else {
        console.warn(`Valor inválido no localStorage para key "${key}", usando valor inicial`);
        return initialValue;
      }
    } catch (error) {
      console.error(`Erro ao ler localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        
        if (!validator(valueToStore)) {
          console.error(`Valor inválido para localStorage key "${key}"`);
          return;
        }
        
        setStoredValue(valueToStore);
        
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Erro ao definir localStorage key "${key}":`, error);
      }
    },
    [key, storedValue, validator]
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Erro ao remover localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

// Hook para localStorage com compressão (para dados grandes)
export function useCompressedLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }

      // Implementação básica de descompressão (em produção, usar biblioteca como lz-string)
      const decompressed = atob(item);
      return JSON.parse(decompressed);
    } catch (error) {
      console.error(`Erro ao ler localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        
        if (typeof window !== 'undefined') {
          // Implementação básica de compressão (em produção, usar biblioteca como lz-string)
          const compressed = btoa(JSON.stringify(valueToStore));
          window.localStorage.setItem(key, compressed);
        }
      } catch (error) {
        console.error(`Erro ao definir localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Erro ao remover localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;