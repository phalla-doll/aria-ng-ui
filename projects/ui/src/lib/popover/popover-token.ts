import { InjectionToken, Signal } from '@angular/core';

export interface UIPopoverState {
  isOpen: Signal<boolean>;
  open(): void;
  close(): void;
  toggle(): void;
}

export const UI_POPOVER = new InjectionToken<UIPopoverState>('UI_POPOVER');
