import { Directive, computed, inject, input } from '@angular/core';
import { UI_TABS } from './tabs-token';
import { tabClasses } from './tabs-variants';

@Directive({
  selector: '[uiTab]',
  standalone: true,
  host: {
    role: 'tab',
    '[class]': 'classes()',
    '[attr.aria-selected]': 'isActive()',
    '[tabindex]': 'isActive() ? 0 : -1',
    '(click)': 'activate()',
  },
})
export class UITabDirective {
  private tabs = inject(UI_TABS);

  readonly value = input.required<string>();

  readonly isActive = computed(() => this.tabs.activeTab() === this.value());
  readonly classes = computed(() => tabClasses('default', this.isActive()));

  activate(): void {
    this.tabs.activate(this.value());
  }
}
