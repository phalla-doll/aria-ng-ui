import { Directive, computed, input } from '@angular/core';
import { inputClasses, InputVariant } from './input-variants';

@Directive({
  selector: '[uiInput]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[attr.data-variant]': 'variant()',
    '[attr.aria-invalid]': 'variant() === "error" ? "true" : null',
  },
})
export class UIInputDirective {
  readonly variant = input<InputVariant>('default');

  readonly classes = computed(() => inputClasses(this.variant()));
}
