export type SwitchSize = 'default' | 'sm' | 'lg';

interface SwitchConfig {
  track: string;
  thumb: string;
  translate: string;
}

const sizeConfigs: Record<SwitchSize, SwitchConfig> = {
  default: { track: 'h-5 w-9', thumb: 'h-4 w-4', translate: 'translate-x-4' },
  sm: { track: 'h-4 w-7', thumb: 'h-3 w-3', translate: 'translate-x-3' },
  lg: { track: 'h-6 w-11', thumb: 'h-5 w-5', translate: 'translate-x-5' },
};

export function switchTrackClasses(size: SwitchSize, checked: boolean): string {
  const base =
    'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50';
  const color = checked ? 'bg-primary' : 'bg-input';
  return `${base} ${color} ${sizeConfigs[size].track}`;
}

export function switchThumbClasses(size: SwitchSize, checked: boolean): string {
  const base =
    'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform';
  const translate = checked ? sizeConfigs[size].translate : 'translate-x-0';
  return `${base} ${sizeConfigs[size].thumb} ${translate}`;
}
