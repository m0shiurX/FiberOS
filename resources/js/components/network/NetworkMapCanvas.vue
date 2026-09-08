<script setup lang="ts">
import type { FeatureCollection } from 'geojson';
import * as maplibregl from 'maplibre-gl';
import type { ExpressionSpecification, LngLatLike, MapGeoJSONFeature } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { onBeforeUnmount, onMounted, shallowRef, watch } from 'vue';
import { CABLE_COLORS, CABLE_WEIGHTS, CLOSURE_COLOR, FAULT_COLOR, INCIDENT_COLOR, LAYER_COLORS, STATUS_COLORS } from '@/lib/network-colors';
import type {
    AssetType,
    ConnectorFeature,
    GeoJsonFeatureCollection,
    NetworkFault,
    NetworkLayers,
    SelectedAsset,
} from '@/types/network';

// maplibre-gl ships its worker as a pair of sibling ESM files (worker + shared chunk) meant to
// be served unbundled; Vite can't preserve that relative-import pairing, so they're copied to
// public/vendor/maplibre-gl (see package.json's "postinstall") and referenced as static assets.
maplibregl.setWorkerUrl('/vendor/maplibre-gl/maplibre-gl-worker.mjs');

const props = defineProps<{
    layers: NetworkLayers;
    visibleLayers: Record<AssetType, boolean>;
    selected: SelectedAsset | null;
    tracedIds: Set<string>;
    flyTo: [number, number] | null;
    pulseRoute: [number, number][] | null;
    fault: NetworkFault | null;
}>();

const emit = defineEmits<{
    select: [AssetType, number];
}>();

const container = shallowRef<HTMLDivElement | null>(null);
let map: maplibregl.Map | null = null;

interface PointLayerConfig {
    key: string;
    type: AssetType;
    color: string;
    radius: number;
}

// All point layers with their visual properties — distinct colors and radii per node type
const POINT_LAYERS: PointLayerConfig[] = [
    { key: 'pops', type: 'pop', color: LAYER_COLORS.pop, radius: 8 },
    { key: 'racks', type: 'rack', color: LAYER_COLORS.rack, radius: 6 },
    { key: 'olts', type: 'olt', color: LAYER_COLORS.olt, radius: 7 },
    { key: 'odfs', type: 'odf', color: LAYER_COLORS.odf, radius: 6 },
    { key: 'routers', type: 'router', color: LAYER_COLORS.router, radius: 6 },
    { key: 'switches', type: 'switch', color: LAYER_COLORS.switch, radius: 6 },
    { key: 'closures', type: 'closure', color: CLOSURE_COLOR, radius: 5 },
    { key: 'splitters', type: 'splitter', color: LAYER_COLORS.splitter, radius: 6 },
    { key: 'poles', type: 'pole', color: LAYER_COLORS.pole, radius: 4 },
    { key: 'manholes', type: 'manhole', color: LAYER_COLORS.manhole, radius: 5 },
    { key: 'fdbs', type: 'fdb', color: LAYER_COLORS.fdb, radius: 6 },
    { key: 'customers', type: 'customer', color: LAYER_COLORS.customer, radius: 5 },
];

function traceKey(type: string, id: number) {
    return `${type}:${id}`;
}

function isDimmed(type: AssetType, id: number): boolean {
    return props.tracedIds.size > 0 && !props.tracedIds.has(traceKey(type, id));
}

function isBroken(type: AssetType, id: number): boolean {
    if (!props.fault) {
        return false;
    }

    if (type === 'fiber') {
        return id === props.fault.fiberId;
    }

    if (type === 'closure') {
        return props.fault.closureIds.includes(id);
    }

    if (type === 'splitter') {
        return props.fault.splitterIds.includes(id);
    }

    if (type === 'customer') {
        return props.fault.customerIds.includes(id);
    }

    return false;
}

function buildSource(collection: GeoJsonFeatureCollection, type: AssetType) {
    return {
        ...collection,
        features: collection.features.map((feature) => ({
            ...feature,
            properties: {
                ...feature.properties,
                assetType: type,
                dimmed: isDimmed(type, feature.properties.id) ? 1 : 0,
                broken: isBroken(type, feature.properties.id) ? 1 : 0,
                selected:
                    props.selected?.type === type &&
                    props.selected?.id === feature.properties.id
                        ? 1
                        : 0,
            },
        })),
    };
}

function isConnectorDimmed(
    properties: ConnectorFeature['properties'],
): boolean {
    if (props.tracedIds.size === 0) {
        return false;
    }

    if (properties.olt_id != null) {
        return !props.tracedIds.has(traceKey('olt', properties.olt_id));
    }

    if (properties.splitter_id != null) {
        return !props.tracedIds.has(
            traceKey('splitter', properties.splitter_id),
        );
    }

    if (properties.customer_id != null) {
        return !props.tracedIds.has(
            traceKey('customer', properties.customer_id),
        );
    }

    return true;
}

function isConnectorBroken(
    properties: ConnectorFeature['properties'],
): boolean {
    if (!props.fault) {
        return false;
    }

    if (properties.splitter_id != null) {
        return props.fault.splitterIds.includes(properties.splitter_id);
    }

    if (properties.customer_id != null) {
        return props.fault.customerIds.includes(properties.customer_id);
    }

    return false;
}

function buildConnectorsSource() {
    return {
        ...props.layers.connectors,
        features: props.layers.connectors.features.map((feature) => ({
            ...feature,
            properties: {
                ...feature.properties,
                dimmed: isConnectorDimmed(feature.properties) ? 1 : 0,
                broken: isConnectorBroken(feature.properties) ? 1 : 0,
            },
        })),
    };
}

function applyData() {
    if (!map) {
        return;
    }

    for (const layer of POINT_LAYERS) {
        const collection = props.layers[layer.key as keyof NetworkLayers] as GeoJsonFeatureCollection | undefined;
        if (!collection) continue;

        const source = map.getSource(layer.key) as
            maplibregl.GeoJSONSource | undefined;
        source?.setData(
            buildSource(collection, layer.type) as FeatureCollection,
        );
    }

    const fiberSource = map.getSource('fibers') as
        maplibregl.GeoJSONSource | undefined;
    fiberSource?.setData(
        buildSource(props.layers.fibers, 'fiber') as FeatureCollection,
    );

    const connectorsSource = map.getSource('connectors') as
        maplibregl.GeoJSONSource | undefined;
    connectorsSource?.setData(buildConnectorsSource() as FeatureCollection);

    // Incidents
    const incidentSource = map.getSource('incidents') as
        maplibregl.GeoJSONSource | undefined;
    incidentSource?.setData(props.layers.incidents as FeatureCollection);
}

function applyVisibility() {
    if (!map) {
        return;
    }

    for (const layer of POINT_LAYERS) {
        if (map.getLayer(layer.key)) {
            map.setLayoutProperty(
                layer.key,
                'visibility',
                props.visibleLayers[layer.type] ? 'visible' : 'none',
            );
        }
    }

    if (map.getLayer('fibers')) {
        map.setLayoutProperty(
            'fibers',
            'visibility',
            props.visibleLayers.fiber ? 'visible' : 'none',
        );
    }

    if (map.getLayer('incidents')) {
        map.setLayoutProperty(
            'incidents',
            'visibility',
            props.visibleLayers.incident ? 'visible' : 'none',
        );
    }
}

function handleClick(feature: MapGeoJSONFeature) {
    const assetType = feature.properties?.assetType as AssetType | undefined;
    const id = feature.properties?.id as number | undefined;

    if (assetType && id) {
        emit('select', assetType, id);
    }
}

const OSM_STYLE: maplibregl.StyleSpecification = {
    version: 8,
    sources: {
        osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
    },
    layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
};

function initialCenter(): [number, number] {
    const firstPop = props.layers.pops.features[0];

    if (firstPop?.geometry.type === 'Point') {
        return firstPop.geometry.coordinates;
    }

    return [89.37010, 24.85560];
}

onMounted(() => {
    if (!container.value) {
        return;
    }

    map = new maplibregl.Map({
        container: container.value,
        style: OSM_STYLE,
        center: initialCenter(),
        zoom: 15,
    });

    map.addControl(
        new maplibregl.NavigationControl({ showCompass: false }),
        'top-right',
    );
    map.on('error', (e) => console.error('MAPLIBRE ERROR', e.error));

    map.on('load', () => {
        if (!map) {
            return;
        }

        // --- Connectors (links between assets) ---
        map.addSource('connectors', {
            type: 'geojson',
            data: buildConnectorsSource() as FeatureCollection,
        });
        map.addLayer({
            id: 'connectors',
            type: 'line',
            source: 'connectors',
            paint: {
                'line-color': CLOSURE_COLOR,
                'line-width': 1.5,
                'line-dasharray': [2, 1.5],
                'line-opacity': [
                    'case',
                    ['==', ['get', 'dimmed'], 1],
                    0.08,
                    0.45,
                ],
            },
        });
        map.addLayer({
            id: 'connectors-broken',
            type: 'line',
            source: 'connectors',
            filter: ['==', ['get', 'broken'], 1],
            paint: {
                'line-color': FAULT_COLOR,
                'line-width': 2.5,
                'line-dasharray': [1.5, 1.5],
            },
        });

        // --- Fiber cables ---
        map.addSource('fibers', {
            type: 'geojson',
            data: buildSource(props.layers.fibers, 'fiber') as FeatureCollection,
        });
        map.addLayer({
            id: 'fibers',
            type: 'line',
            source: 'fibers',
            paint: {
                'line-color': [
                    'match',
                    ['get', 'type'],
                    'Feeder', CABLE_COLORS.feeder,
                    'Distribution', CABLE_COLORS.distribution,
                    'Drop', CABLE_COLORS.drop,
                    LAYER_COLORS.fiber,
                ],
                'line-width': [
                    'match',
                    ['get', 'type'],
                    'Feeder', CABLE_WEIGHTS.feeder,
                    'Distribution', CABLE_WEIGHTS.distribution,
                    'Drop', CABLE_WEIGHTS.drop,
                    2.5,
                ] as ExpressionSpecification,
                'line-dasharray': [
                    'match',
                    ['get', 'type'],
                    'Drop', [3, 4],
                    [1, 0],
                ] as unknown as ExpressionSpecification,
                'line-opacity': [
                    'case',
                    ['==', ['get', 'dimmed'], 1],
                    0.15,
                    0.9,
                ],
            },
        });
        map.addLayer({
            id: 'fibers-broken',
            type: 'line',
            source: 'fibers',
            filter: ['==', ['get', 'broken'], 1],
            paint: {
                'line-color': FAULT_COLOR,
                'line-width': 3,
                'line-dasharray': [2, 2],
            },
        });

        // --- Point layers ---
        for (const layer of POINT_LAYERS) {
            const collection = props.layers[layer.key as keyof NetworkLayers] as GeoJsonFeatureCollection | undefined;
            if (!collection) continue;

            map.addSource(layer.key, {
                type: 'geojson',
                data: buildSource(collection, layer.type) as FeatureCollection,
            });
            map.addLayer({
                id: layer.key,
                type: 'circle',
                source: layer.key,
                paint: {
                    'circle-color': [
                        'case',
                        ['==', ['get', 'broken'], 1],
                        FAULT_COLOR,
                        layer.color,
                    ],
                    'circle-radius': [
                        'case',
                        ['==', ['get', 'selected'], 1],
                        layer.radius + 4,
                        layer.radius,
                    ],
                    'circle-opacity': [
                        'case',
                        ['==', ['get', 'dimmed'], 1],
                        0.15,
                        1,
                    ],
                    'circle-stroke-width': [
                        'case',
                        ['==', ['get', 'selected'], 1],
                        3,
                        1,
                    ],
                    'circle-stroke-color': '#ffffff',
                    'circle-stroke-opacity': [
                        'case',
                        ['==', ['get', 'dimmed'], 1],
                        0.15,
                        1,
                    ],
                },
            });

            map.on('click', layer.key, (e) => {
                if (e.features?.[0]) {
                    handleClick(e.features[0]);
                }
            });
            map.on('mouseenter', layer.key, () => {
                if (map) {
                    map.getCanvas().style.cursor = 'pointer';
                }
            });
            map.on('mouseleave', layer.key, () => {
                if (map) {
                    map.getCanvas().style.cursor = '';
                }
            });
        }

        // --- Incidents ---
        map.addSource('incidents', {
            type: 'geojson',
            data: props.layers.incidents as FeatureCollection,
        });
        map.addLayer({
            id: 'incidents-halo',
            type: 'circle',
            source: 'incidents',
            paint: {
                'circle-color': INCIDENT_COLOR,
                'circle-radius': 16,
                'circle-blur': 0.7,
                'circle-opacity': 0.35,
            },
        });
        map.addLayer({
            id: 'incidents-marker',
            type: 'circle',
            source: 'incidents',
            paint: {
                'circle-color': INCIDENT_COLOR,
                'circle-radius': 9,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
            },
        });
        map.on('click', 'incidents-marker', (e) => {
            if (e.features?.[0]) {
                handleClick(e.features[0]);
            }
        });

        // --- Pulse route ---
        map.addSource('pulse', { type: 'geojson', data: emptyPoint() });
        map.addLayer({
            id: 'pulse-glow',
            type: 'circle',
            source: 'pulse',
            paint: {
                'circle-color': '#00B8D9',
                'circle-radius': 14,
                'circle-blur': 1,
                'circle-opacity': 0.5,
            },
        });
        map.addLayer({
            id: 'pulse-core',
            type: 'circle',
            source: 'pulse',
            paint: {
                'circle-color': '#ffffff',
                'circle-radius': 5,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#00B8D9',
            },
        });
        map.setLayoutProperty('pulse-glow', 'visibility', 'none');
        map.setLayoutProperty('pulse-core', 'visibility', 'none');

        // --- Fault marker ---
        map.addSource('fault', { type: 'geojson', data: emptyPoint() });
        map.addLayer({
            id: 'fault-halo',
            type: 'circle',
            source: 'fault',
            paint: {
                'circle-color': FAULT_COLOR,
                'circle-radius': 16,
                'circle-blur': 0.7,
                'circle-opacity': 0.35,
            },
        });
        map.addLayer({
            id: 'fault-mark',
            type: 'circle',
            source: 'fault',
            paint: {
                'circle-color': FAULT_COLOR,
                'circle-radius': 9,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
            },
        });
        map.addLayer({
            id: 'fault-cross',
            type: 'symbol',
            source: 'fault',
            layout: {
                'text-field': '✕',
                'text-size': 12,
                'text-allow-overlap': true,
                'text-ignore-placement': true,
            },
            paint: { 'text-color': '#ffffff' },
        });
        map.setLayoutProperty('fault-halo', 'visibility', 'none');
        map.setLayoutProperty('fault-mark', 'visibility', 'none');
        map.setLayoutProperty('fault-cross', 'visibility', 'none');

        applyVisibility();
        applyPulseRoute();
        applyFault();
    });
});

onBeforeUnmount(() => {
    stopPulse();
    stopFault();
    map?.remove();
    map = null;
});

function emptyPoint(): GeoJSON.FeatureCollection {
    return { type: 'FeatureCollection', features: [] };
}

function segmentLengths(route: [number, number][]): {
    cumulative: number[];
    total: number;
} {
    const cumulative = [0];

    for (let i = 1; i < route.length; i++) {
        const [lng1, lat1] = route[i - 1];
        const [lng2, lat2] = route[i];
        const distance = Math.hypot(lng2 - lng1, lat2 - lat1);
        cumulative.push(cumulative[i - 1] + distance);
    }

    return { cumulative, total: cumulative[cumulative.length - 1] };
}

function pointAt(
    route: [number, number][],
    cumulative: number[],
    distance: number,
): [number, number] {
    for (let i = 1; i < route.length; i++) {
        if (distance <= cumulative[i] || i === route.length - 1) {
            const segmentLength = cumulative[i] - cumulative[i - 1];
            const t =
                segmentLength === 0
                    ? 0
                    : (distance - cumulative[i - 1]) / segmentLength;
            const [lng1, lat1] = route[i - 1];
            const [lng2, lat2] = route[i];

            return [lng1 + (lng2 - lng1) * t, lat1 + (lat2 - lat1) * t];
        }
    }

    return route[route.length - 1];
}

let pulseFrame: number | null = null;

function stopPulse() {
    if (pulseFrame !== null) {
        cancelAnimationFrame(pulseFrame);
    }

    pulseFrame = null;

    if (map?.getLayer('pulse-glow')) {
        map.setLayoutProperty('pulse-glow', 'visibility', 'none');
        map.setLayoutProperty('pulse-core', 'visibility', 'none');
    }
}

const PULSE_DURATION_MS = 2800;

function startPulse(route: [number, number][]) {
    if (!map || route.length < 2) {
        return;
    }

    map.setLayoutProperty('pulse-glow', 'visibility', 'visible');
    map.setLayoutProperty('pulse-core', 'visibility', 'visible');

    const bounds = route.reduce(
        (b, coordinate) => b.extend(coordinate as LngLatLike),
        new maplibregl.LngLatBounds(
            route[0] as LngLatLike,
            route[0] as LngLatLike,
        ),
    );
    map.fitBounds(bounds, { padding: 80, duration: 800 });

    const { cumulative, total } = segmentLengths(route);
    const source = map.getSource('pulse') as maplibregl.GeoJSONSource;
    const start = performance.now();

    const tick = (now: number) => {
        const elapsed = (now - start) % PULSE_DURATION_MS;
        const distance = (elapsed / PULSE_DURATION_MS) * total;
        const coordinates = pointAt(route, cumulative, distance);
        source.setData({
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: { type: 'Point', coordinates },
                    properties: {},
                },
            ],
        });
        pulseFrame = requestAnimationFrame(tick);
    };

    pulseFrame = requestAnimationFrame(tick);
}

function applyPulseRoute() {
    stopPulse();

    if (props.pulseRoute) {
        startPulse(props.pulseRoute);
    }
}

let faultFrame: number | null = null;

function stopFault() {
    if (faultFrame !== null) {
        cancelAnimationFrame(faultFrame);
    }

    faultFrame = null;

    if (map?.getLayer('fault-halo')) {
        map.setLayoutProperty('fault-halo', 'visibility', 'none');
        map.setLayoutProperty('fault-mark', 'visibility', 'none');
        map.setLayoutProperty('fault-cross', 'visibility', 'none');
    }
}

function startFault(breakPoint: [number, number]) {
    if (!map) {
        return;
    }

    const source = map.getSource('fault') as maplibregl.GeoJSONSource;
    source.setData({
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: breakPoint },
                properties: {},
            },
        ],
    });

    map.setLayoutProperty('fault-halo', 'visibility', 'visible');
    map.setLayoutProperty('fault-mark', 'visibility', 'visible');
    map.setLayoutProperty('fault-cross', 'visibility', 'visible');
    map.flyTo({
        center: breakPoint as LngLatLike,
        zoom: Math.max(map.getZoom(), 16.5),
        speed: 0.8,
    });

    const start = performance.now();
    const tick = (now: number) => {
        const t = (now - start) / 1000;
        const wave = (Math.sin(t * 3) + 1) / 2;

        if (map) {
            map.setPaintProperty('fault-halo', 'circle-radius', 14 + wave * 10);
            map.setPaintProperty(
                'fault-halo',
                'circle-opacity',
                0.15 + wave * 0.3,
            );
        }

        faultFrame = requestAnimationFrame(tick);
    };

    faultFrame = requestAnimationFrame(tick);
}

function applyFault() {
    stopFault();

    if (props.fault) {
        startFault(props.fault.breakPoint);
    }
}

watch(
    () => [props.layers, props.selected, props.tracedIds, props.fault],
    applyData,
    { deep: true },
);
watch(() => props.visibleLayers, applyVisibility, { deep: true });
watch(
    () => props.flyTo,
    (target) => {
        if (target && map) {
            map.flyTo({ center: target as LngLatLike, zoom: 17.5, speed: 0.9 });
        }
    },
);
watch(() => props.pulseRoute, applyPulseRoute);
watch(() => props.fault, applyFault);
</script>

<template>
    <div ref="container" class="h-full w-full" />
</template>
