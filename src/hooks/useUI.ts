// Hooks personalizados para gerenciamento de estado da UI

'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';

// Hook para gerenciar modais
export function useModal(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen
  };
}

// Hook para gerenciar múltiplos modais
export function useModals<T extends string>(modalNames: T[]) {
  const [modals, setModals] = useState<Record<T, boolean>>(() => {
    const initialState = {} as Record<T, boolean>;
    modalNames.forEach(name => {
      initialState[name] = false;
    });
    return initialState;
  });

  const openModal = useCallback((name: T) => {
    setModals(prev => ({ ...prev, [name]: true }));
  }, []);

  const closeModal = useCallback((name: T) => {
    setModals(prev => ({ ...prev, [name]: false }));
  }, []);

  const toggleModal = useCallback((name: T) => {
    setModals(prev => ({ ...prev, [name]: !prev[name] }));
  }, []);

  const closeAllModals = useCallback(() => {
    const closedState = {} as Record<T, boolean>;
    modalNames.forEach(name => {
      closedState[name] = false;
    });
    setModals(closedState);
  }, [modalNames]);

  return {
    modals,
    openModal,
    closeModal,
    toggleModal,
    closeAllModals,
    isAnyOpen: Object.values(modals).some(Boolean)
  };
}

// Hook para gerenciar abas
export function useTabs<T extends string>(tabs: T[], defaultTab?: T) {
  const [activeTab, setActiveTab] = useState<T>(defaultTab || tabs[0]);

  const switchTab = useCallback((tab: T) => {
    if (tabs.includes(tab)) {
      setActiveTab(tab);
    }
  }, [tabs]);

  const nextTab = useCallback(() => {
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex = (currentIndex + 1) % tabs.length;
    setActiveTab(tabs[nextIndex]);
  }, [tabs, activeTab]);

  const prevTab = useCallback(() => {
    const currentIndex = tabs.indexOf(activeTab);
    const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
    setActiveTab(tabs[prevIndex]);
  }, [tabs, activeTab]);

  return {
    activeTab,
    setActiveTab: switchTab,
    nextTab,
    prevTab,
    isActive: (tab: T) => activeTab === tab,
    tabIndex: tabs.indexOf(activeTab)
  };
}

// Hook para gerenciar acordeões
export function useAccordion<T extends string>(items: T[], allowMultiple = false) {
  const [openItems, setOpenItems] = useState<Set<T>>(new Set());

  const toggle = useCallback((item: T) => {
    setOpenItems((prev: Set<T>) => {
      const newSet = new Set<T>(prev);
      if (newSet.has(item)) {
        newSet.delete(item);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(item);
      }
      return newSet;
    });
  }, [allowMultiple]);

  const open = useCallback((item: T) => {
    setOpenItems((prev: Set<T>) => {
      const newSet = allowMultiple ? new Set<T>(prev) : new Set<T>();
      newSet.add(item);
      return newSet;
    });
  }, [allowMultiple]);

  const close = useCallback((item: T) => {
    setOpenItems((prev: Set<T>) => {
      const newSet = new Set<T>(prev);
      newSet.delete(item);
      return newSet;
    });
  }, []);

  const closeAll = useCallback(() => {
    setOpenItems(new Set());
  }, []);

  const openAll = useCallback(() => {
    if (allowMultiple) {
      setOpenItems(new Set(items));
    }
  }, [items, allowMultiple]);

  return {
    openItems,
    toggle,
    open,
    close,
    closeAll,
    openAll,
    isOpen: (item: T) => openItems.has(item)
  };
}

// Hook para gerenciar loading states
export function useLoading(initialStates: Record<string, boolean> = {}) {
  const [loadingStates, setLoadingStates] = useState(initialStates);

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: loading }));
  }, []);

  const startLoading = useCallback((key: string) => {
    setLoading(key, true);
  }, [setLoading]);

  const stopLoading = useCallback((key: string) => {
    setLoading(key, false);
  }, [setLoading]);

  const isLoading = useCallback((key: string) => {
    return Boolean(loadingStates[key]);
  }, [loadingStates]);

  const isAnyLoading = Object.values(loadingStates).some(Boolean);

  return {
    loadingStates,
    setLoading,
    startLoading,
    stopLoading,
    isLoading,
    isAnyLoading
  };
}

// Hook para gerenciar formulários
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules?: Partial<Record<keyof T, (value: any) => string | null>>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Validar campo se houver regras
    if (validationRules?.[field]) {
      const error = validationRules[field]!(value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  }, [validationRules]);

  const setFieldTouched = useCallback((field: keyof T, isTouched = true) => {
    setTouched(prev => ({ ...prev, [field]: isTouched }));
  }, []);

  const validateField = useCallback((field: keyof T) => {
    if (validationRules?.[field]) {
      const error = validationRules[field]!(values[field]);
      setErrors(prev => ({ ...prev, [field]: error }));
      return !error;
    }
    return true;
  }, [validationRules, values]);

  const validateForm = useCallback(() => {
    if (!validationRules) return true;

    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const key = field as keyof T;
      const error = validationRules[key]!(values[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validationRules, values]);

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => Promise<void> | void) => 
      async (e?: React.FormEvent) => {
        e?.preventDefault();
        
        if (!validateForm()) {
          return;
        }

        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } finally {
          setIsSubmitting(false);
        }
      },
    [values, validateForm]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const hasErrors = Object.values(errors).some(error => Boolean(error));
  const isValid = !hasErrors && Object.keys(touched).length > 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    validateField,
    validateForm,
    handleSubmit,
    reset,
    hasErrors,
    isValid
  };
}

// Hook para gerenciar paginação
export function usePagination({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1
}: {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const firstPage = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  const lastPage = useCallback(() => {
    goToPage(totalPages);
  }, [totalPages, goToPage]);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsPerPage,
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    isFirst: currentPage === 1,
    isLast: currentPage === totalPages
  };
}

// Hook para gerenciar filtros
export function useFilters<T extends Record<string, any>>(initialFilters: T) {
  const [filters, setFilters] = useState<T>(initialFilters);
  const [activeFilters, setActiveFilters] = useState<Set<keyof T>>(new Set());

  const setFilter = useCallback((key: keyof T, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    if (value !== initialFilters[key] && value !== null && value !== undefined && value !== '') {
      setActiveFilters(prev => new Set(prev).add(key));
    } else {
      setActiveFilters(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    }
  }, [initialFilters]);

  const removeFilter = useCallback((key: keyof T) => {
    setFilters(prev => ({ ...prev, [key]: initialFilters[key] }));
    setActiveFilters(prev => {
      const newSet = new Set(prev);
      newSet.delete(key);
      return newSet;
    });
  }, [initialFilters]);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setActiveFilters(new Set());
  }, [initialFilters]);

  const hasActiveFilters = activeFilters.size > 0;

  return {
    filters,
    activeFilters,
    setFilter,
    removeFilter,
    clearFilters,
    hasActiveFilters,
    isFilterActive: (key: keyof T) => activeFilters.has(key)
  };
}

// Hook para gerenciar tema
export function useTheme() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark' | 'system'>('theme', 'system');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  // Detectar tema do sistema
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

      const handleChange = (e: MediaQueryListEvent) => {
        setSystemTheme(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Aplicar tema ao documento
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      const effectiveTheme = theme === 'system' ? systemTheme : theme;
      
      root.classList.remove('light', 'dark');
      root.classList.add(effectiveTheme);
    }
  }, [theme, systemTheme]);

  const effectiveTheme = theme === 'system' ? systemTheme : theme;

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  }, [setTheme]);

  return {
    theme,
    effectiveTheme,
    systemTheme,
    setTheme,
    toggleTheme,
    isDark: effectiveTheme === 'dark',
    isLight: effectiveTheme === 'light',
    isSystem: theme === 'system'
  };
}

// Hook para gerenciar sidebar
export function useSidebar(initialOpen = false) {
  const [isOpen, setIsOpen] = useLocalStorage('sidebar-open', initialOpen);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é mobile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, [setIsOpen]);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  // Fechar sidebar automaticamente no mobile quando clicar fora
  const handleOverlayClick = useCallback(() => {
    if (isMobile) {
      close();
    }
  }, [isMobile, close]);

  return {
    isOpen,
    isMobile,
    toggle,
    open,
    close,
    handleOverlayClick,
    shouldShowOverlay: isMobile && isOpen
  };
}

// Hook para gerenciar notificações toast
export function useToast() {
  const [toasts, setToasts] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
  }>>([]);

  const addToast = useCallback((
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    duration = 5000
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const success = useCallback((message: string, duration?: number) => {
    return addToast(message, 'success', duration);
  }, [addToast]);

  const error = useCallback((message: string, duration?: number) => {
    return addToast(message, 'error', duration);
  }, [addToast]);

  const warning = useCallback((message: string, duration?: number) => {
    return addToast(message, 'warning', duration);
  }, [addToast]);

  const info = useCallback((message: string, duration?: number) => {
    return addToast(message, 'info', duration);
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info
  };
}

export default {
  useModal,
  useModals,
  useTabs,
  useAccordion,
  useLoading,
  useForm,
  usePagination,
  useFilters,
  useTheme,
  useSidebar,
  useToast
};