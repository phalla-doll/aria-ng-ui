import { Component, ChangeDetectionStrategy, computed, input, model } from '@angular/core';
import { switchTrackClasses, switchThumbClasses, SwitchSize } from './switch-variants';

@Component({
  selector: 'ui-switch',
  standalone: true,
  template: `
    <button
      type="button"
      role="switch"
      [attr.aria-checked]="checked()"
      [disabled]="disabled()"
      [class]="trackClasses()"
      (click)="toggle()"
    >
      <span [class]="thumbClasses()"></span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UISwitchComponent {
  readonly checked = model<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly size = input<SwitchSize>('default');

  readonly trackClasses = computed(() => switchTrackClasses(this.size(), this.checked()));
  readonly thumbClasses = computed(() => switchThumbClasses(this.size(), this.checked()));

  toggle(): void {
    if (!this.disabled()) {
      this.checked.set(!this.checked());
    }
  }
}
