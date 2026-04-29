import { Directive, computed } from '@angular/core';
import { dropdownMenuLabelClasses } from './dropdown-menu-variants';

@Directive({
  selector: '[uiDropdownMenuLabel]',
  standalone: true,
  host: {
    '[class]': 'classes()',
  },
})
export class UIDropdownMenuLabelDirective {
  readonly classes = computed(() => dropdownMenuLabelClasses());
}
