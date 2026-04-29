import { Directive, computed, inject, input } from '@angular/core';
import { UI_ACCORDION } from './accordion-token';
import { accordionContentClasses } from './accordion-variants';

@Directive({
  selector: '[uiAccordionContent]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[attr.role]': '"region"',
    '[hidden]': '!isExpanded()',
  },
})
export class UIAccordionContentDirective {
  private accordion = inject(UI_ACCORDION);

  readonly value = input.required<string>();
  readonly id = input.required<string>();

  readonly isExpanded = computed(() => this.accordion.expandedItems().has(this.value()));
  readonly classes = computed(() => accordionContentClasses());
}
