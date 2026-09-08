import type { AssetType } from '@/types/network';

// Reference design color palette (from design system tokens)
export const LAYER_COLORS: Record<Exclude<AssetType, 'closure' | 'incident'>, string> = {
    pop: '#2563EB',      // blue-600
    rack: '#4A5567',     // n-600 (white with border, but use border color)
    olt: '#7C5CFC',      // violet-500
    odf: '#00B8D9',      // cyan-500
    router: '#0B1220',   // ink-900
    switch: '#4A5567',   // n-600
    fiber: '#00B8D9',    // cyan-500
    splitter: '#0B1220', // ink-900
    fdb: '#0B1220',      // ink-900 (white with border)
    customer: '#16C784', // green-500
    pole: '#94A0B4',     // n-400
    manhole: '#94A0B4',  // n-400 (white with border)
};

export const CLOSURE_COLOR = '#00B8D9'; // cyan-500

export const FAULT_COLOR = '#E5484D'; // red-500

export const INCIDENT_COLOR = '#E5484D'; // red-500

export const STATUS_COLORS = {
    online: '#16C784',   // green-500
    warning: '#F5A524',  // amber-500
    critical: '#E5484D', // red-500
    offline: '#94A0B4',  // n-400
};

// Cable colors by type
export const CABLE_COLORS = {
    feeder: '#2563EB',      // blue-600
    distribution: '#00B8D9', // cyan-500
    drop: '#94A0B4',         // n-400
};

// Cable weights by type
export const CABLE_WEIGHTS = {
    feeder: 3.5,
    distribution: 2.5,
    drop: 1.5,
};
