"use client";

import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg shadow-lg border animate-in slide-in-from-right-full ${
            toast.variant === "destructive"
              ? "bg-red-600 text-white border-red-700"
              : "bg-white text-gray-900 border-gray-200"
          }`}
          role="alert"
        >
          {toast.title && <div className="font-bold">{toast.title}</div>}
          {toast.description && <div className="text-sm opacity-90">{toast.description}</div>}
        </div>
      ))}
    </div>
  );
}
