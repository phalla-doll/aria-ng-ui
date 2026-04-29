import { Directive, inject } from '@angular/core';
import { UI_POPOVER } from './popover-token';

@Directive({
  selector: '[uiPopoverTrigger]',
  standalone: true,
  host: {
    '[attr.aria-haspopup]': '"true"',
    '[attr.aria-expanded]': 'popover.isOpen()',
    '(click)': 'popover.toggle()',
  },
})
export class UIPopoverTriggerDirective {
  protected popover = inject(UI_POPOVER);
}
