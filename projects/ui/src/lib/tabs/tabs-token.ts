import { InjectionToken, Signal } from '@angular/core';

export interface UITabsState {
  activeTab: Signal<string>;
  activate(tabId: string): void;
}

export const UI_TABS = new InjectionToken<UITabsState>('UI_TABS');
