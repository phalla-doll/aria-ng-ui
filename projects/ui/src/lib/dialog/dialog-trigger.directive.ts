import { Directive, inject } from '@angular/core';
import { UI_DIALOG } from './dialog-token';

@Directive({
  selector: '[uiDialogTrigger]',
  standalone: true,
  host: {
    '(click)': 'dialog.open()',
  },
})
export class UIDialogTriggerDirective {
  protected dialog = inject(UI_DIALOG);
}
