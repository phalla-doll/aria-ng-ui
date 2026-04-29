import {
  Component,
  ChangeDetectionStrategy,
  Signal,
  computed,
  input,
  model,
  signal,
} from '@angular/core';
import { UI_TABS, UITabsState } from './tabs-token';
import { TabsVariant } from './tabs-variants';

@Component({
  selector: 'ui-tabs',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: UI_TABS,
      useFactory: (tabs: UITabsComponent) => tabs,
      deps: [UITabsComponent],
    },
  ],
})
export class UITabsComponent implements UITabsState {
  readonly value = model<string>('');
  readonly variant = input<TabsVariant>('default');

  readonly activeTab: Signal<string> = computed(() => this.value());

  activate(tabId: string): void {
    this.value.set(tabId);
  }
}
