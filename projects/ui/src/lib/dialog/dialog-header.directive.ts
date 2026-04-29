import { Directive, computed, inject } from '@angular/core';
import { UI_DIALOG } from './dialog-token';
import { dialogHeaderClasses } from './dialog-variants';

@Directive({
  selector: '[uiDialogHeader]',
  standalone: true,
  host: {
    '[class]': 'classes()',
  },
})
export class UIDialogHeaderDirective {
  readonly classes = computed(() => dialogHeaderClasses());
}
