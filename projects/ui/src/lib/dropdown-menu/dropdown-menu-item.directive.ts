import { Directive, computed, inject, input } from '@angular/core';
import { UI_DROPDOWN_MENU } from './dropdown-menu-token';
import { dropdownMenuItemClasses } from './dropdown-menu-variants';

@Directive({
  selector: '[uiDropdownMenuItem]',
  standalone: true,
  host: {
    role: 'menuitem',
    '[class]': 'classes()',
    '[tabindex]': 'disabled() ? -1 : 0',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '(click)': 'onClick()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class UIDropdownMenuItemDirective {
  private menu = inject(UI_DROPDOWN_MENU);

  readonly disabled = input<boolean>(false);

  readonly classes = computed(() => dropdownMenuItemClasses());

  onClick(): void {
    if (!this.disabled()) {
      this.menu.close();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onClick();
    }
  }
}
