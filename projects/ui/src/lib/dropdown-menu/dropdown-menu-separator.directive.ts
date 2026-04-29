import { Directive, computed } from '@angular/core';
import { dropdownMenuSeparatorClasses } from './dropdown-menu-variants';

@Directive({
  selector: '[uiDropdownMenuSeparator]',
  standalone: true,
  host: {
    role: 'separator',
    '[class]': 'classes()',
  },
})
export class UIDropdownMenuSeparatorDirective {
  readonly classes = computed(() => dropdownMenuSeparatorClasses());
}
