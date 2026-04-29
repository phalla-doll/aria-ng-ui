import { InjectionToken, Signal } from '@angular/core';

export interface UIDropdownMenuState {
  isOpen: Signal<boolean>;
  open(): void;
  close(): void;
  toggle(): void;
}

export const UI_DROPDOWN_MENU = new InjectionToken<UIDropdownMenuState>('UI_DROPDOWN_MENU');
