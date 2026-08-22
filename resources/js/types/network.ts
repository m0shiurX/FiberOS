export type AssetType =
    'pop' | 'olt' | 'fiber' | 'closure' | 'splitter' | 'customer';

export interface GeoJsonFeature<Properties = Record<string, unknown>> {
    type: 'Feature';
    geometry:
        | { type: 'Point'; coordinates: [number, number] }
        | { type: 'LineString'; coordinates: [number, number][] };
    properties: Properties & { id: number; code: string };
}

export interface GeoJsonFeatureCollection<
    Properties = Record<string, unknown>,
> {
    type: 'FeatureCollection';
    features: GeoJsonFeature<Properties>[];
}

export interface ConnectorFeature {
    type: 'Feature';
    geometry: { type: 'LineString'; coordinates: [number, number][] };
    properties: { olt_id?: number; splitter_id?: number; customer_id?: number };
}

export interface ConnectorCollection {
    type: 'FeatureCollection';
    features: ConnectorFeature[];
}

export interface NetworkLayers {
    pops: GeoJsonFeatureCollection<{ name: string }>;
    olts: GeoJsonFeatureCollection<{
        name: string;
        vendor: string;
        model: string;
        pop_code: string;
    }>;
    fibers: GeoJsonFeatureCollection<{
        type: string;
        used_cores: number;
        core_capacity: number;
        olt_code: string;
    }>;
    closures: GeoJsonFeatureCollection<{ fiber_code: string }>;
    splitters: GeoJsonFeatureCollection<{
        type: string;
        occupied_ports: number;
        port_count: number;
    }>;
    customers: GeoJsonFeatureCollection<{ name: string; status: string }>;
    connectors: ConnectorCollection;
}

export interface CustomerDetail {
    code: string;
    name: string;
    status: string;
    phone: string;
    address: string;
    onu_model: string;
    onu_serial: string;
    splitter_code: string;
    splitter_port: string;
    pon_code: string;
    olt_code: string;
    pop_code: string;
}

export interface SplitterDetail {
    code: string;
    type: string;
    closure_code: string;
    input_fiber_code: string;
    occupied_ports: number;
    available_ports: number;
}

export interface FiberDetail {
    code: string;
    type: string;
    core_capacity: number;
    used_cores: number;
    source: string;
}

export interface OltDetail {
    code: string;
    name: string;
    vendor: string;
    model: string;
    pop_code: string;
}

export interface ClosureDetail {
    code: string;
    fiber_code: string;
    connected_splitters: number;
    connected_customers: number;
}

export interface NetworkDetails {
    customer: Record<number, CustomerDetail>;
    splitter: Record<number, SplitterDetail>;
    fiber: Record<number, FiberDetail>;
    olt: Record<number, OltDetail>;
    closure: Record<number, ClosureDetail>;
}

export interface TraceStep {
    type: string;
    id: number;
    code: string;
    label: string;
}

export interface SplitterImpact {
    asset_type: 'splitter';
    code: string;
    type: string;
    occupied_ports: number;
    available_ports: number;
    affected_customers: number;
}

export interface FiberImpact {
    asset_type: 'fiber';
    code: string;
    connected_splitters: number;
    connected_onus: number;
    affected_customers: number;
}

export interface SelectedAsset {
    type: AssetType;
    id: number;
}

export interface NetworkFault {
    fiberId: number;
    closureIds: number[];
    splitterIds: number[];
    customerIds: number[];
    breakPoint: [number, number];
}
