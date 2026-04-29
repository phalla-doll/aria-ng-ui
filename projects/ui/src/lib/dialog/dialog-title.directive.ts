import { Directive, computed } from '@angular/core';
import { dialogTitleClasses } from './dialog-variants';

@Directive({
  selector: '[uiDialogTitle]',
  standalone: true,
  host: {
    '[class]': 'classes()',
  },
})
export class UIDialogTitleDirective {
  readonly classes = computed(() => dialogTitleClasses());
}
