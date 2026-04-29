export type CheckboxSize = 'default' | 'sm' | 'lg';

const baseClasses =
  'shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';

const checkedClasses = 'bg-primary text-primary-foreground';

const sizeClasses: Record<CheckboxSize, string> = {
  default: 'h-4 w-4',
  sm: 'h-3.5 w-3.5',
  lg: 'h-5 w-5',
};

export function checkboxClasses(size: CheckboxSize, checked: boolean): string {
  return `${baseClasses} ${sizeClasses[size]} ${checked ? checkedClasses : ''}`.trim();
}
