import { Directive, computed, inject, input } from '@angular/core';
import { UI_ACCORDION } from './accordion-token';
import { accordionTriggerClasses } from './accordion-variants';

@Directive({
  selector: '[uiAccordionTrigger]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[attr.aria-expanded]': 'isExpanded()',
    '[attr.aria-controls]': 'controlsId()',
    '(click)': 'toggle()',
  },
})
export class UIAccordionTriggerDirective {
  private accordion = inject(UI_ACCORDION);

  readonly value = input.required<string>();
  readonly controlsId = input.required<string>();

  readonly isExpanded = computed(() => this.accordion.expandedItems().has(this.value()));
  readonly classes = computed(() => accordionTriggerClasses());

  toggle(): void {
    this.accordion.toggle(this.value());
  }
}
