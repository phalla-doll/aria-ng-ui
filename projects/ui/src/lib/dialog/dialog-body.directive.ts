import { Directive, computed } from '@angular/core';
import { dialogBodyClasses } from './dialog-variants';

@Directive({
  selector: '[uiDialogBody]',
  standalone: true,
  host: {
    '[class]': 'classes()',
  },
})
export class UIDialogBodyDirective {
  readonly classes = computed(() => dialogBodyClasses());
}
