export type AssetType =
    'pop' | 'rack' | 'olt' | 'odf' | 'router' | 'switch' | 'fiber' | 'closure' | 'splitter' | 'fdb' | 'customer' | 'pole' | 'manhole' | 'incident';

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
    properties: { olt_id?: number; splitter_id?: number; customer_id?: number; fdb_id?: number };
}

export interface ConnectorCollection {
    type: 'FeatureCollection';
    features: ConnectorFeature[];
}

export interface NetworkLayers {
    pops: GeoJsonFeatureCollection<{ name: string }>;
    racks: GeoJsonFeatureCollection<{
        name: string;
        rack_units: number;
        occupied_units: number;
        vendor: string | null;
        model: string | null;
        power_capacity: string | null;
        pop_code: string;
    }>;
    olts: GeoJsonFeatureCollection<{
        name: string;
        vendor: string;
        model: string;
        pop_code: string;
    }>;
    odfs: GeoJsonFeatureCollection<{
        name: string;
        type: string;
        vendor: string | null;
        model: string | null;
        serial: string | null;
        port_count: number;
        connector_type: string;
        polish_type: string;
        status: string;
        rack_code: string;
    }>;
    routers: GeoJsonFeatureCollection<{
        name: string;
        vendor: string;
        model: string;
        router_type: string;
        os: string | null;
        firmware: string | null;
        serial: string | null;
        management_ip: string | null;
        mac: string | null;
        status: string;
        rack_code: string;
    }>;
    switches: GeoJsonFeatureCollection<{
        name: string;
        vendor: string;
        model: string;
        layer: string;
        os: string | null;
        firmware: string | null;
        serial: string | null;
        management_ip: string | null;
        mac: string | null;
        vlan: string | null;
        status: string;
        rack_code: string;
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
    poles: GeoJsonFeatureCollection<{
        name: string;
        type: string;
        height: number;
        owner: string;
    }>;
    manholes: GeoJsonFeatureCollection<{
        name: string;
        type: string;
        duct_count: number;
        slack_length: string | null;
    }>;
    fdbs: GeoJsonFeatureCollection<{
        name: string;
        type: string;
        port_count: number;
        ports_used: number;
        fed_by_cable: string | null;
        fed_by_core: string | null;
        status: string;
    }>;
    customers: GeoJsonFeatureCollection<{ name: string; status: string }>;
    incidents: GeoJsonFeatureCollection<{
        type: string;
        severity: string;
        affected_subscribers: number;
        first_detected: string | null;
        duration: string | null;
        status: string;
        description: string | null;
    }>;
    connectors: ConnectorCollection;
}

export interface CustomerTelemetry {
    rx_power: number | null;
    tx_power: number | null;
    olt_rx: number | null;
    distance: number | null;
    temperature: number | null;
    voltage: number | null;
    last_seen: string | null;
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
    telemetry: CustomerTelemetry | null;
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

export interface RackDetail {
    code: string;
    name: string;
    rack_units: number;
    occupied_units: number;
    vendor: string | null;
    model: string | null;
    power_capacity: string | null;
    pop_code: string;
}

export interface OdfDetail {
    code: string;
    name: string;
    type: string;
    vendor: string | null;
    model: string | null;
    serial: string | null;
    port_count: number;
    connector_type: string;
    polish_type: string;
    status: string;
    rack_code: string;
}

export interface RouterDetail {
    code: string;
    name: string;
    vendor: string;
    model: string;
    router_type: string;
    os: string | null;
    firmware: string | null;
    serial: string | null;
    management_ip: string | null;
    mac: string | null;
    status: string;
    rack_code: string;
}

export interface SwitchDetail {
    code: string;
    name: string;
    vendor: string;
    model: string;
    layer: string;
    os: string | null;
    firmware: string | null;
    serial: string | null;
    management_ip: string | null;
    mac: string | null;
    vlan: string | null;
    status: string;
    rack_code: string;
}

export interface FdbDetail {
    code: string;
    name: string;
    type: string;
    port_count: number;
    ports_used: number;
    fed_by_cable: string | null;
    fed_by_core: string | null;
    status: string;
}

export interface PoleDetail {
    code: string;
    name: string;
    type: string;
    height: number;
    owner: string;
}

export interface ManholeDetail {
    code: string;
    name: string;
    type: string;
    duct_count: number;
    slack_length: string | null;
}

export interface IncidentDetail {
    code: string;
    type: string;
    severity: string;
    affected_subscribers: number;
    first_detected: string | null;
    duration: string | null;
    status: string;
    description: string | null;
}

export interface NetworkDetails {
    customer: Record<number, CustomerDetail>;
    splitter: Record<number, SplitterDetail>;
    fiber: Record<number, FiberDetail>;
    olt: Record<number, OltDetail>;
    closure: Record<number, ClosureDetail>;
    rack: Record<number, RackDetail>;
    odf: Record<number, OdfDetail>;
    router: Record<number, RouterDetail>;
    switch: Record<number, SwitchDetail>;
    fdb: Record<number, FdbDetail>;
    pole: Record<number, PoleDetail>;
    manhole: Record<number, ManholeDetail>;
    incident: Record<number, IncidentDetail>;
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

export interface ActiveIncident {
    id: number;
    code: string;
    type: string;
    severity: string;
    affected_subscribers: number;
    first_detected: string | null;
    duration: string | null;
    status: string;
    description: string | null;
    lng: number;
    lat: number;
}

export interface Alarm {
    id: number;
    code: string | null;
    severity: string;
    message: string | null;
    asset_type: string;
    asset_id: number;
}
