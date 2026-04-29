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
import { UI_DIALOG, UIDialogState } from './dialog-token';
import { UIDialogContentDirective } from './dialog-content.directive';
import { dialogContentVisualClasses } from './dialog-variants';

@Component({
  selector: 'ui-dialog',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: UI_DIALOG,
      useFactory: (dialog: UIDialogComponent) => dialog,
      deps: [UIDialogComponent],
    },
  ],
})
export class UIDialogComponent implements UIDialogState, OnDestroy {
  @ContentChild(UIDialogContentDirective, { read: TemplateRef })
  contentTemplate!: TemplateRef<unknown>;

  readonly isOpen = signal(false);
  private overlayRef: OverlayRef | null = null;
  private previouslyFocusedElement: HTMLElement | null = null;

  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);

  open(): void {
    if (this.isOpen()) return;
    this.previouslyFocusedElement = document.activeElement as HTMLElement;
    this.isOpen.set(true);

    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: true,
      backdropClass: 'bg-black/80',
    });

    const portal = new TemplatePortal(this.contentTemplate, this.viewContainerRef);
    this.overlayRef.attach(portal);

    const el = this.overlayRef.overlayElement;
    el.classList.add(...dialogContentVisualClasses().split(' '));
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('tabindex', '-1');

    this.overlayRef.backdropClick().subscribe(() => this.close());

    this.overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });

    requestAnimationFrame(() => {
      this.overlayRef?.overlayElement?.focus();
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

  ngOnDestroy(): void {
    this.close();
  }
}
