"use client";

import { useState, useEffect } from "react";

let toastCount = 0;
const subscribers = new Set<(toasts: any[]) => void>();
let toasts: any[] = [];

const notify = () => {
  subscribers.forEach((sub) => sub([...toasts]));
};

export function useToast() {
  const [localToasts, setLocalToasts] = useState<any[]>(toasts);

  useEffect(() => {
    subscribers.add(setLocalToasts);
    return () => {
      subscribers.delete(setLocalToasts);
    };
  }, []);

  const toast = ({ title, description, variant, duration = 3000 }: any) => {
    const id = ++toastCount;
    const newToast = { id, title, description, variant };
    toasts = [...toasts, newToast];
    notify();

    if (duration > 0) {
      setTimeout(() => {
        toasts = toasts.filter((t) => t.id !== id);
        notify();
      }, duration);
    }
  };

  return { toast, toasts: localToasts };
}
