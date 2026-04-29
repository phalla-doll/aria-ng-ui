import { InjectionToken, Signal } from '@angular/core';

export interface UIAccordionState {
  expandedItems: Signal<ReadonlySet<string>>;
  toggle(itemId: string): void;
}

export const UI_ACCORDION = new InjectionToken<UIAccordionState>('UI_ACCORDION');
