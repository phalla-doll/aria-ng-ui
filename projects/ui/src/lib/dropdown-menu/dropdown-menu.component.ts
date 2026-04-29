import {
  Component,
  ChangeDetectionStrategy,
  ContentChild,
  ElementRef,
  inject,
  signal,
  TemplateRef,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { UI_DROPDOWN_MENU, UIDropdownMenuState } from './dropdown-menu-token';
import { UIDropdownMenuContentDirective } from './dropdown-menu-content.directive';
import { dropdownMenuContentClasses } from './dropdown-menu-variants';

@Component({
  selector: 'ui-dropdown-menu',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: UI_DROPDOWN_MENU,
      useFactory: (dm: UIDropdownMenuComponent) => dm,
      deps: [UIDropdownMenuComponent],
    },
  ],
})
export class UIDropdownMenuComponent implements UIDropdownMenuState, OnDestroy {
  @ContentChild(UIDropdownMenuContentDirective, { read: TemplateRef })
  contentTemplate!: TemplateRef<unknown>;

  readonly isOpen = signal(false);
  private overlayRef: OverlayRef | null = null;
  private previouslyFocusedElement: HTMLElement | null = null;

  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef<HTMLElement>);
  private viewContainerRef = inject(ViewContainerRef);

  open(): void {
    if (this.isOpen()) return;
    this.previouslyFocusedElement = document.activeElement as HTMLElement;
    this.isOpen.set(true);

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    if (this.contentTemplate) {
      const portal = new TemplatePortal(this.contentTemplate, this.viewContainerRef);
      this.overlayRef.attach(portal);
      this.overlayRef.overlayElement.classList.add(...dropdownMenuContentClasses().split(' '));
      this.overlayRef.overlayElement.setAttribute('role', 'menu');
    }

    this.overlayRef.backdropClick().subscribe(() => this.close());
    this.overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.close();
      }
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        this.handleArrowNavigation(event.key === 'ArrowDown');
      }
    });
  }

  close(): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
      this.previouslyFocusedElement = null;
    }
  }

  toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  private handleArrowNavigation(isDown: boolean): void {
    if (!this.overlayRef) return;
    const items = this.overlayRef.overlayElement.querySelectorAll(
      '[role="menuitem"]',
    ) as NodeListOf<HTMLElement>;
    if (!items.length) return;

    const currentIndex = Array.from(items).indexOf(document.activeElement as HTMLElement);
    let nextIndex: number;

    if (currentIndex === -1) {
      nextIndex = isDown ? 0 : items.length - 1;
    } else {
      nextIndex = isDown ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= items.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = items.length - 1;
    }

    items[nextIndex].focus();
  }

  ngOnDestroy(): void {
    this.close();
  }
}
