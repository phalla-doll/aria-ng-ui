import { Directive, computed } from '@angular/core';
import { labelClasses } from './label-variants';

@Directive({
  selector: '[uiLabel]',
  standalone: true,
  host: {
    '[class]': 'classes()',
  },
})
export class UILabelDirective {
  readonly classes = computed(() => labelClasses());
}
