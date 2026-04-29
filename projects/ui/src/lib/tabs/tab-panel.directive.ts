import { Directive, computed, inject, input } from '@angular/core';
import { UI_TABS } from './tabs-token';
import { tabPanelClasses } from './tabs-variants';

@Directive({
  selector: '[uiTabPanel]',
  standalone: true,
  host: {
    role: 'tabpanel',
    '[class]': 'classes()',
    '[attr.aria-labelledby]': 'labelledBy()',
    '[hidden]': '!isActive()',
  },
})
export class UITabPanelDirective {
  private tabs = inject(UI_TABS);

  readonly value = input.required<string>();

  readonly isActive = computed(() => this.tabs.activeTab() === this.value());
  readonly classes = computed(() => tabPanelClasses());
  readonly labelledBy = computed(() => `ui-tab-${this.value()}`);
}
