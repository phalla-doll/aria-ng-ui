import {
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  signal,
  ViewContainerRef,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { UITooltipContentComponent } from './tooltip-content.component';
import { uniqueId } from '../utils/id';

@Directive({
  selector: '[uiTooltip]',
  standalone: true,
  host: {
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
    '(focus)': 'show()',
    '(blur)': 'hide()',
  },
})
export class UITooltipDirective implements OnDestroy {
  readonly content = input.required<string>({ alias: 'uiTooltip' });
  readonly position = input<'top' | 'bottom' | 'left' | 'right'>('top');
  readonly delay = input<number>(200);

  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef<HTMLElement>);
  private viewContainerRef = inject(ViewContainerRef);
  private renderer = inject(Renderer2);

  private overlayRef: OverlayRef | null = null;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private tooltipId = uniqueId('ui-tooltip');

  private get positionConfig(): ConnectedPosition {
    const positions: Record<string, ConnectedPosition> = {
      top: { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' },
      bottom: { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' },
      left: { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' },
      right: { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' },
    };
    return positions[this.position()];
  }

  show(): void {
    this.timeoutId = setTimeout(() => {
      this.createTooltip();
    }, this.delay());
  }

  hide(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.detachTooltip();
  }

  ngOnDestroy(): void {
    this.hide();
  }

  private createTooltip(): void {
    if (this.overlayRef) return;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([this.positionConfig]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    const tooltipRef = this.viewContainerRef.createComponent(UITooltipContentComponent);
    tooltipRef.setInput('content', this.content());

    this.renderer.setAttribute(this.elementRef.nativeElement, 'aria-describedby', this.tooltipId);
    tooltipRef.location.nativeElement.id = this.tooltipId;

    this.overlayRef.attach(tooltipRef.location);
  }

  private detachTooltip(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
    this.renderer.removeAttribute(this.elementRef.nativeElement, 'aria-describedby');
  }
}
