export type TabsVariant = 'default' | 'outline';

const tabBaseClasses =
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const tabVariantClasses: Record<TabsVariant, { active: string; inactive: string }> = {
  default: {
    active: 'bg-background text-foreground shadow-sm',
    inactive: 'text-muted-foreground hover:text-foreground',
  },
  outline: {
    active: 'bg-background text-foreground border-b-2 border-primary',
    inactive: 'text-muted-foreground border-b-2 border-transparent hover:text-foreground',
  },
};

export function tabClasses(variant: TabsVariant, active: boolean): string {
  const state = active ? tabVariantClasses[variant].active : tabVariantClasses[variant].inactive;
  return `${tabBaseClasses} ${state}`;
}

const panelClasses =
  'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export function tabPanelClasses(): string {
  return panelClasses;
}

const listClasses =
  'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground';

export function tabListClasses(): string {
  return listClasses;
}
