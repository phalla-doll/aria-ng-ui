export type ToastVariant = 'default' | 'success' | 'error' | 'warning';

const variantClasses: Record<ToastVariant, string> = {
  default: 'bg-background text-foreground border',
  success: 'bg-primary text-primary-foreground',
  error: 'bg-destructive text-destructive-foreground',
  warning: 'bg-yellow-500 text-white',
};

const baseClasses =
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md p-4 shadow-lg';

export function toastClasses(variant: ToastVariant): string {
  return `${baseClasses} ${variantClasses[variant]}`;
}

export interface ToastConfig {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface Toast extends ToastConfig {
  id: string;
}

export interface ToastRef {
  dismiss: () => void;
}
