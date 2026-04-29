import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ToastService } from './toast.service';
import { UIToastComponent } from './toast.component';

@Component({
  selector: 'ui-toast-container',
  standalone: true,
  imports: [UIToastComponent],
  template: `
    <div
      class="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[420px]"
    >
      @for (toast of toastService.toasts(); track toast.id) {
        <ui-toast [toast]="toast" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UIToastContainerComponent {
  readonly toastService = inject(ToastService);
}
