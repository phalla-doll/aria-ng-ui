const itemClasses = 'border-b';

export function accordionItemClasses(): string {
  return itemClasses;
}

const triggerBaseClasses =
  'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[aria-expanded=true]>svg]:rotate-180';

export function accordionTriggerClasses(): string {
  return triggerBaseClasses;
}

const contentClasses = 'overflow-hidden text-sm transition-all';

export function accordionContentClasses(): string {
  return contentClasses;
}

const chevronClasses = 'h-4 w-4 shrink-0 transition-transform duration-200';

export function accordionChevronClasses(): string {
  return chevronClasses;
}
