import { Component, ChangeDetectionStrategy, computed, input, model } from '@angular/core';
import { checkboxClasses, CheckboxSize } from './checkbox-variants';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  template: `
    <button
      type="button"
      role="checkbox"
      [attr.aria-checked]="checked()"
      [disabled]="disabled()"
      [class]="classes()"
      (click)="toggle()"
    >
      @if (checked()) {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-3 w-3"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      }
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UICheckboxComponent {
  readonly checked = model<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly size = input<CheckboxSize>('default');

  readonly classes = computed(() => checkboxClasses(this.size(), this.checked()));

  toggle(): void {
    if (!this.disabled()) {
      this.checked.set(!this.checked());
    }
  }
}
