import type { AssetType } from '@/types/network';

export const LAYER_COLORS: Record<Exclude<AssetType, 'closure'>, string> = {
    pop: '#2563eb',
    olt: '#7c3aed',
    fiber: '#00b8d9',
    splitter: '#f59e0b',
    customer: '#16c784',
};

export const CLOSURE_COLOR = '#0b1220';

export const FAULT_COLOR = '#dc2626';
