import { Directive, computed, inject } from '@angular/core';
import { UI_DIALOG } from './dialog-token';
import { dialogCloseClasses } from './dialog-variants';

@Directive({
  selector: '[uiDialogClose]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '(click)': 'dialog.close()',
  },
})
export class UIDialogCloseDirective {
  protected dialog = inject(UI_DIALOG);
  readonly classes = computed(() => dialogCloseClasses());
}
