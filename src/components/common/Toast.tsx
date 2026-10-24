import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t, idx) => {
        const Icon = t.type === 'success' ? CheckCircle2 : t.type === 'warning' ? AlertCircle : Info;
        const colorClasses =
          t.type === 'success'
            ? 'border-emerald-500/40 bg-slate-900/95 text-emerald-300'
            : t.type === 'warning'
            ? 'border-amber-500/40 bg-slate-900/95 text-amber-300'
            : 'border-cyan-500/40 bg-slate-900/95 text-cyan-300';

        return (
          <div
            key={`${t.id}-${idx}`}
            className={`pointer-events-auto flex items-center justify-between gap-3 rounded-xl border p-3.5 shadow-xl backdrop-blur-md transition-all ${colorClasses}`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className="h-4 w-4 flex-shrink-0" />
              <p className="text-xs font-semibold leading-snug">{t.message}</p>
            </div>
            <button
              onClick={() => onDismiss(t.id)}
              className="rounded-lg p-1 text-slate-400 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
