import { Directive, ElementRef, computed, inject } from '@angular/core';
import { UI_TABS } from './tabs-token';
import { tabListClasses } from './tabs-variants';

@Directive({
  selector: '[uiTabList]',
  standalone: true,
  host: {
    role: 'tablist',
    '[class]': 'classes()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class UITabListDirective {
  private tabs = inject(UI_TABS);
  private elementRef = inject(ElementRef<HTMLElement>);

  readonly classes = computed(() => tabListClasses());

  onKeydown(event: KeyboardEvent): void {
    const tabElements = this.getTabElements();
    if (!tabElements.length) return;

    const currentIndex = tabElements.indexOf(document.activeElement as HTMLElement);
    let nextIndex: number | null = null;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = this.getNextIndex(currentIndex, tabElements.length, 1);
        break;
      case 'ArrowLeft':
        nextIndex = this.getNextIndex(currentIndex, tabElements.length, -1);
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabElements.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      tabElements[nextIndex].focus();
    }
  }

  private getNextIndex(current: number, total: number, direction: number): number {
    let next = current + direction;
    if (next >= total) next = 0;
    if (next < 0) next = total - 1;
    return next;
  }

  private getTabElements(): HTMLElement[] {
    return Array.from(this.elementRef.nativeElement.querySelectorAll('[role="tab"]'));
  }
}
