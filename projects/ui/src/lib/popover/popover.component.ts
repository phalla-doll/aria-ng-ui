import {
  Component,
  ChangeDetectionStrategy,
  ContentChild,
  ElementRef,
  inject,
  input,
  signal,
  TemplateRef,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { UI_POPOVER, UIPopoverState } from './popover-token';
import { UIPopoverContentDirective } from './popover-content.directive';
import { popoverClasses } from './popover-variants';

@Component({
  selector: 'ui-popover',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: UI_POPOVER,
      useFactory: (pop: UIPopoverComponent) => pop,
      deps: [UIPopoverComponent],
    },
  ],
})
export class UIPopoverComponent implements UIPopoverState, OnDestroy {
  readonly position = input<'top' | 'bottom' | 'left' | 'right'>('bottom');

  @ContentChild(UIPopoverContentDirective, { read: TemplateRef })
  contentTemplate!: TemplateRef<unknown>;

  readonly isOpen = signal(false);
  private overlayRef: OverlayRef | null = null;

  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef<HTMLElement>);
  private viewContainerRef = inject(ViewContainerRef);

  private get positionConfig(): ConnectedPosition {
    const positions: Record<string, ConnectedPosition> = {
      top: { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' },
      bottom: { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' },
      left: { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' },
      right: { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' },
    };
    return positions[this.position()];
  }

  open(): void {
    if (this.isOpen()) return;
    this.isOpen.set(true);

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([this.positionConfig]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    const portal = new TemplatePortal(this.contentTemplate, this.viewContainerRef);
    this.overlayRef.attach(portal);
    this.overlayRef.overlayElement.classList.add(...popoverClasses().split(' '));
    this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  close(): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  ngOnDestroy(): void {
    this.close();
  }
}
