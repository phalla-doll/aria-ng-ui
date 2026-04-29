import { Directive, computed, input } from '@angular/core';
import { buttonClasses, ButtonVariant, ButtonSize } from './button-variants';

@Directive({
  selector: '[uiButton]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
  },
})
export class UIButtonDirective {
  readonly variant = input<ButtonVariant>('default');
  readonly size = input<ButtonSize>('default');

  readonly classes = computed(() => buttonClasses(this.variant(), this.size()));
}
