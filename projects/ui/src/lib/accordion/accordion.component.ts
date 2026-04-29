import { Component, ChangeDetectionStrategy, computed, input, signal } from '@angular/core';
import { UI_ACCORDION, UIAccordionState } from './accordion-token';

@Component({
  selector: 'ui-accordion',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: UI_ACCORDION,
      useFactory: (acc: UIAccordionComponent) => acc,
      deps: [UIAccordionComponent],
    },
  ],
})
export class UIAccordionComponent implements UIAccordionState {
  readonly type = input<'single' | 'multiple'>('single');
  readonly collapsible = input<boolean>(true);

  readonly expandedItems = signal<ReadonlySet<string>>(new Set());

  toggle(itemId: string): void {
    this.expandedItems.update((current) => {
      const next = new Set(current);
      if (this.type() === 'single') {
        if (next.has(itemId)) {
          if (this.collapsible()) {
            next.clear();
          }
        } else {
          next.clear();
          next.add(itemId);
        }
      } else {
        if (next.has(itemId)) {
          next.delete(itemId);
        } else {
          next.add(itemId);
        }
      }
      return next;
    });
  }
}
