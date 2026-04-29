const contentClasses =
  'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md';

export function dropdownMenuContentClasses(): string {
  return contentClasses;
}

const itemClasses =
  'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50';

export function dropdownMenuItemClasses(): string {
  return itemClasses;
}

const separatorClasses = '-mx-1 my-1 h-px bg-muted';

export function dropdownMenuSeparatorClasses(): string {
  return separatorClasses;
}

const labelClasses = 'px-2 py-1.5 text-sm font-semibold';

export function dropdownMenuLabelClasses(): string {
  return labelClasses;
}
