import { Directive, inject } from '@angular/core';
import { UI_DROPDOWN_MENU } from './dropdown-menu-token';

@Directive({
  selector: '[uiDropdownMenuTrigger]',
  standalone: true,
  host: {
    '[attr.aria-haspopup]': '"true"',
    '[attr.aria-expanded]': 'menu.isOpen()',
    '(click)': 'menu.toggle()',
  },
})
export class UIDropdownMenuTriggerDirective {
  protected menu = inject(UI_DROPDOWN_MENU);
}
