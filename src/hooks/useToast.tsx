import { useState, useCallback } from 'react';

export interface ToastInterface {
  status: string;
  title: string;
  description: string;
  duration: number;
  isClosable: boolean;
}

export function useToast() {
  const [toast, setToast] = useState<ToastInterface | null>(null);

  const showToast = useCallback(
    (newToast: ToastInterface) => {
      setToast(newToast);
    },
    [setToast]
  );

  const hideToast = useCallback(() => {
    setToast(null);
  }, [setToast]);

  return { toast, showToast, hideToast };
}