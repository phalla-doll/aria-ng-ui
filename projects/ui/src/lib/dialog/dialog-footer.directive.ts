import { Directive, computed } from '@angular/core';
import { dialogFooterClasses } from './dialog-variants';

@Directive({
  selector: '[uiDialogFooter]',
  standalone: true,
  host: {
    '[class]': 'classes()',
  },
})
export class UIDialogFooterDirective {
  readonly classes = computed(() => dialogFooterClasses());
}
