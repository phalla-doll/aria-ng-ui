import { Component, ChangeDetectionStrategy, computed, inject, input } from '@angular/core';
import { ToastService } from './toast.service';
import { Toast, toastClasses, ToastVariant } from './toast-variants';

@Component({
  selector: 'ui-toast',
  standalone: true,
  template: `
    <div class="grid gap-1">
      @if (toast().title) {
        <div class="text-sm font-semibold">{{ toast().title }}</div>
      }
      @if (toast().description) {
        <div class="text-sm opacity-90">{{ toast().description }}</div>
      }
    </div>
    <button
      class="absolute right-1 top-1 rounded-md p-1 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none group-hover:opacity-100"
      (click)="dismiss()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    role: 'status',
    '[attr.aria-live]': '"polite"',
  },
})
export class UIToastComponent {
  readonly toast = input.required<Toast>();

  private toastService = inject(ToastService);

  readonly classes = computed(() => toastClasses(this.toast().variant ?? 'default'));

  dismiss(): void {
    this.toastService.dismiss(this.toast().id);
  }
}
