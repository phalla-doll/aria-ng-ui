import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core';
import { tooltipClasses } from './tooltip-variants';

@Component({
  selector: 'ui-tooltip-content',
  standalone: true,
  template: `{{ content() }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    role: 'tooltip',
  },
})
export class UITooltipContentComponent {
  readonly content = input.required<string>();
  readonly classes = computed(() => tooltipClasses());
}
