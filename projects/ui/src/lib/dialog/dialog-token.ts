import { InjectionToken, Signal } from '@angular/core';

export interface UIDialogState {
  isOpen: Signal<boolean>;
  open(): void;
  close(): void;
}

export const UI_DIALOG = new InjectionToken<UIDialogState>('UI_DIALOG');
