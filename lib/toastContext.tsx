'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'wishlist';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  subtext?: string;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType, subtext?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = 'success', subtext?: string) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev.slice(-3), { id, message, type, subtext }]);
      setTimeout(() => removeToast(id), 3500);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

// ─── Toast Container UI ───────────────────────────────────────────────────────
function ToastContainer() {
  const { toasts, removeToast } = useContext(ToastContext)!;
  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const iconMap: Record<ToastType, JSX.Element> = {
    success: (
      <div className="w-8 h-8 rounded-full bg-[#c9a84c]/20 flex items-center justify-center shrink-0">
        <svg className="w-4 h-4 text-[#c9a84c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
    ),
    wishlist: (
      <div className="w-8 h-8 rounded-full bg-[#ffc9d5]/40 flex items-center justify-center shrink-0">
        <svg className="w-4 h-4 text-[#b76e79]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </div>
    ),
    error: (
      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
        <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
        </svg>
      </div>
    ),
    info: (
      <div className="w-8 h-8 rounded-full bg-[#f2d9c9] flex items-center justify-center shrink-0">
        <svg className="w-4 h-4 text-[#6b4c4c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
        </svg>
      </div>
    ),
  };

  return (
    <div className={`pointer-events-auto flex items-start gap-3 px-4 py-3 bg-white rounded-2xl shadow-xl shadow-[#3d2c2c]/10 border border-[#ffc9d5]/40 min-w-[280px] max-w-[340px] transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {iconMap[toast.type]}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#3d2c2c] leading-snug">{toast.message}</p>
        {toast.subtext && (
          <p className="text-xs text-[#9d7e7e] mt-0.5 font-light truncate">{toast.subtext}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[#9d7e7e] hover:text-[#3d2c2c] hover:bg-[#f9ede4] transition-colors mt-0.5"
      >
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
