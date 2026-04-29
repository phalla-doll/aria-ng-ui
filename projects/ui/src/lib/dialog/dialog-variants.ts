const overlayClasses = 'fixed inset-0 z-50 bg-black/80';

export function dialogOverlayClasses(): string {
  return overlayClasses;
}

const contentClasses =
  'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg sm:rounded-lg';

export function dialogContentClasses(): string {
  return contentClasses;
}

const contentVisualClasses =
  'z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg';

export function dialogContentVisualClasses(): string {
  return contentVisualClasses;
}

const headerClasses = 'flex flex-col space-y-1.5 text-center sm:text-left';

export function dialogHeaderClasses(): string {
  return headerClasses;
}

const titleClasses = 'text-lg font-semibold leading-none tracking-tight';

export function dialogTitleClasses(): string {
  return titleClasses;
}

const bodyClasses = 'text-sm text-muted-foreground';

export function dialogBodyClasses(): string {
  return bodyClasses;
}

const footerClasses = 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2';

export function dialogFooterClasses(): string {
  return footerClasses;
}

const closeClasses =
  'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

export function dialogCloseClasses(): string {
  return closeClasses;
}
