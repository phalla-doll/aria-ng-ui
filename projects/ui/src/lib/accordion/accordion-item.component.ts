import { Component, ChangeDetectionStrategy, computed, inject, input } from '@angular/core';
import { uniqueId } from '../utils/id';
import { UI_ACCORDION } from './accordion-token';
import { accordionItemClasses } from './accordion-variants';

@Component({
  selector: 'ui-accordion-item',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
  },
})
export class UIAccordionItemComponent {
  private accordion = inject(UI_ACCORDION);

  readonly value = input.required<string>();
  readonly id = input(uniqueId('acc'));

  readonly isExpanded = computed(() => this.accordion.expandedItems().has(this.value()));
  readonly classes = computed(() => accordionItemClasses());
}
