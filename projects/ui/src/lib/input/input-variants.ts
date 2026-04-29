export type InputVariant = 'default' | 'error';

const baseClasses =
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50';

const variantClasses: Record<InputVariant, string> = {
  default: '',
  error: 'border-destructive focus-visible:ring-destructive',
};

export function inputClasses(variant: InputVariant): string {
  return `${baseClasses} ${variantClasses[variant]}`.trim();
}
