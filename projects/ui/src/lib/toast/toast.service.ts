import { Injectable, signal } from '@angular/core';
import { Toast, ToastConfig, ToastRef } from './toast-variants';
import { uniqueId } from '../utils/id';

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<readonly Toast[]>([]);

  show(config: ToastConfig): ToastRef {
    const id = uniqueId('toast');
    const toast: Toast = {
      id,
      title: config.title,
      description: config.description,
      variant: config.variant ?? 'default',
      duration: config.duration,
    };

    this.toasts.update((current) => [...current, toast]);

    const duration = config.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }

    return { dismiss: () => this.dismiss(id) };
  }

  success(config: Omit<ToastConfig, 'variant'>): ToastRef {
    return this.show({ ...config, variant: 'success' });
  }

  error(config: Omit<ToastConfig, 'variant'>): ToastRef {
    return this.show({ ...config, variant: 'error' });
  }

  warning(config: Omit<ToastConfig, 'variant'>): ToastRef {
    return this.show({ ...config, variant: 'warning' });
  }

  dismiss(id: string): void {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }

  dismissAll(): void {
    this.toasts.set([]);
  }
}
