<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { computed, reactive, ref } from 'vue';
import AssetDetailPanel from '@/components/network/AssetDetailPanel.vue';
import NetworkMapCanvas from '@/components/network/NetworkMapCanvas.vue';
import TraceBar from '@/components/network/TraceBar.vue';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import type {
    ActiveIncident,
    Alarm,
    AssetType,
    CustomerDetail,
    FiberImpact,
    NetworkDetails,
    NetworkLayers,
    SelectedAsset,
    SplitterImpact,
    TraceStep,
} from '@/types/network';

const props = defineProps<{
    layers: NetworkLayers;
    details: NetworkDetails;
    incidents?: ActiveIncident[];
    alarms?: Alarm[];
    activeIncident?: ActiveIncident | null;
}>();

const ALL_LAYER_TYPES: { type: AssetType; label: string; group: string }[] = [
    { type: 'pop', label: 'POP', group: 'Sites' },
    { type: 'rack', label: 'Rack / Cabinet', group: 'Sites' },
    { type: 'pole', label: 'Pole', group: 'Sites' },
    { type: 'manhole', label: 'Manhole', group: 'Sites' },
    { type: 'olt', label: 'OLT', group: 'Active Equipment' },
    { type: 'router', label: 'Router', group: 'Active Equipment' },
    { type: 'switch', label: 'Switch', group: 'Active Equipment' },
    { type: 'customer', label: 'ONU', group: 'Active Equipment' },
    { type: 'odf', label: 'ODF', group: 'Passive Optical' },
    { type: 'closure', label: 'Closure', group: 'Passive Optical' },
    { type: 'splitter', label: 'Splitter', group: 'Passive Optical' },
    { type: 'fdb', label: 'FDB / FAT', group: 'Passive Optical' },
    { type: 'fiber', label: 'Fiber Cable', group: 'Fiber' },
    { type: 'incident', label: 'Incidents', group: 'Operational' },
];

const visibleLayers = reactive<Record<AssetType, boolean>>(
    Object.fromEntries(ALL_LAYER_TYPES.map((l) => [l.type, true])) as Record<AssetType, boolean>,
);

const statusFilter = ref<'all' | 'active' | 'offline'>('all');
const searchQuery = ref('');
const selected = ref<SelectedAsset | null>(null);
const flyTo = ref<[number, number] | null>(null);
const activeTab = ref<'layers' | 'details' | 'trace'>('layers');

const trace = ref<TraceStep[] | null>(null);
const revealedCount = ref(0);
const tracing = ref(false);
let traceTimer: ReturnType<typeof setInterval> | null = null;

const impact = ref<SplitterImpact | FiberImpact | null>(null);
const loadingImpact = ref(false);

const tracedIds = computed(() => {
    const ids = new Set<string>();
    if (trace.value) {
        for (const step of trace.value.slice(0, revealedCount.value)) {
            ids.add(`${step.type}:${step.id}`);
        }
    }
    return ids;
});

const GEOMETRIC_LAYER_KEY: Partial<
    Record<TraceStep['type'], string>
> = {
    pop: 'pops',
    olt: 'olts',
    fiber: 'fibers',
    closure: 'closures',
    splitter: 'splitters',
    customer: 'customers',
};

function coordinatesFor(step: TraceStep): [number, number][] | null {
    const layerKey = GEOMETRIC_LAYER_KEY[step.type];
    if (!layerKey) return null;

    const collection = props.layers[layerKey as keyof NetworkLayers] as { features: Array<{ geometry: { type: string; coordinates: [number, number] | [number, number][] }; properties: { id: number } }> } | undefined;
    if (!collection) return null;

    const feature = collection.features.find((f) => f.properties.id === step.id);
    if (!feature) return null;

    const coords = feature.geometry.coordinates;

    return feature.geometry.type === 'Point'
        ? [coords as [number, number]]
        : coords as [number, number][];
}

const pulseRoute = computed<[number, number][] | null>(() => {
    if (!trace.value || tracing.value) return null;
    const downstream = [...trace.value].reverse();
    const coordinates = downstream.flatMap((step) => coordinatesFor(step) ?? []);
    return coordinates.length >= 2 ? coordinates : null;
});

const faultActive = ref(false);
const FAULT_FIBER_CODE = 'DC-019';

const fault = computed(() => {
    if (!faultActive.value) return null;

    const fiber = props.layers.fibers.features.find((f) => f.properties.code === FAULT_FIBER_CODE);
    if (!fiber || fiber.geometry.type !== 'LineString') return null;

    const closureIds = props.layers.closures.features
        .filter((f) => props.details.closure[f.properties.id]?.fiber_code === FAULT_FIBER_CODE)
        .map((f) => f.properties.id);

    const splitterFeatures = props.layers.splitters.features.filter((f) => props.details.splitter[f.properties.id]?.input_fiber_code === FAULT_FIBER_CODE);
    const splitterIds = splitterFeatures.map((f) => f.properties.id);
    const splitterCodes = new Set(splitterFeatures.map((f) => f.properties.code));

    const customerIds = props.layers.customers.features
        .filter((f) => splitterCodes.has((props.details.customer[f.properties.id] as CustomerDetail | undefined)?.splitter_code ?? ''))
        .map((f) => f.properties.id);

    const coordinates = fiber.geometry.coordinates;

    return {
        fiberId: fiber.properties.id,
        closureIds,
        splitterIds,
        customerIds,
        breakPoint: coordinates[Math.floor(coordinates.length / 2)] as [number, number],
    };
});

type SearchHit = {
    type: AssetType;
    id: number;
    code: string;
    label: string;
    coordinates: [number, number];
};

const filteredLayers = computed<NetworkLayers>(() => {
    if (statusFilter.value === 'all') return props.layers;

    const wantActive = statusFilter.value === 'active';
    return {
        ...props.layers,
        customers: {
            ...props.layers.customers,
            features: props.layers.customers.features.filter((feature) =>
                wantActive ? feature.properties.status === 'Active' : feature.properties.status !== 'Active',
            ),
        },
    };
});

const searchIndex = computed<SearchHit[]>(() => {
    const hits: SearchHit[] = [];
    const collect = (
        type: AssetType,
        key: string,
        label: (props: Record<string, unknown>) => string,
    ) => {
        const collection = props.layers[key as keyof NetworkLayers] as { features: Array<{ geometry: { type: string; coordinates: [number, number] | [number, number][] }; properties: Record<string, unknown> }> } | undefined;
        if (!collection) return;

        for (const feature of collection.features) {
            const rawCoords = feature.geometry.coordinates;
            const coordinates: [number, number] = feature.geometry.type === 'Point'
                ? rawCoords as [number, number]
                : (rawCoords as [number, number][])[0];
            hits.push({
                type,
                id: feature.properties.id as number,
                code: feature.properties.code as string,
                label: label(feature.properties),
                coordinates,
            });
        }
    };

    collect('customer', 'customers', (p) => p.name as string);
    collect('splitter', 'splitters', (p) => p.type as string);
    collect('fiber', 'fibers', (p) => p.type as string);
    collect('closure', 'closures', (p) => p.fiber_code as string);
    collect('olt', 'olts', (p) => p.name as string);
    collect('pop', 'pops', (p) => p.name as string);
    collect('fdb', 'fdbs', (p) => p.type as string);
    collect('odf', 'odfs', (p) => p.name as string);
    collect('rack', 'racks', (p) => p.name as string);
    collect('router', 'routers', (p) => p.name as string);
    collect('switch', 'switches', (p) => p.name as string);
    collect('pole', 'poles', (p) => p.name as string);
    collect('manhole', 'manholes', (p) => p.name as string);

    return hits;
});

const searchResults = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) return [];

    return searchIndex.value
        .filter((hit) => hit.code.toLowerCase().includes(query) || hit.label.toLowerCase().includes(query))
        .slice(0, 8);
});

function clearTrace() {
    if (traceTimer) clearInterval(traceTimer);
    traceTimer = null;
    trace.value = null;
    revealedCount.value = 0;
    tracing.value = false;
}

function selectAsset(hit: SearchHit) {
    clearTrace();
    impact.value = null;
    selected.value = { type: hit.type, id: hit.id };
    flyTo.value = hit.coordinates;
    searchQuery.value = '';
    activeTab.value = 'details';
}

function onMapSelect(type: AssetType, id: number) {
    clearTrace();
    impact.value = null;
    selected.value = { type, id };
    activeTab.value = 'details';
}

async function runTrace() {
    if (selected.value?.type !== 'customer') return;
    clearTrace();
    tracing.value = true;

    const response = await fetch(`/network/customers/${selected.value.id}/trace`);
    const data: { path: TraceStep[] } = await response.json();
    trace.value = data.path;

    traceTimer = setInterval(() => {
        if (!trace.value) return;
        revealedCount.value += 1;
        if (revealedCount.value >= trace.value.length) {
            if (traceTimer) clearInterval(traceTimer);
            tracing.value = false;
        }
    }, 350);
}

async function runImpact() {
    if (!selected.value) return;
    loadingImpact.value = true;
    impact.value = null;

    if (selected.value.type === 'splitter') {
        const response = await fetch(`/network/splitters/${selected.value.id}/impact`);
        impact.value = await response.json();
    } else if (selected.value.type === 'fiber') {
        const response = await fetch(`/network/fibers/${selected.value.id}/impact`);
        impact.value = await response.json();
    }

    loadingImpact.value = false;
}

const layerGroups = computed(() => {
    const groups: Record<string, { type: AssetType; label: string; count: number }[]> = {};
    for (const layer of ALL_LAYER_TYPES) {
        const collection = props.layers[layer.type as keyof NetworkLayers] as { features: unknown[] } | undefined;
        const count = collection?.features.length ?? 0;
        if (!groups[layer.group]) groups[layer.group] = [];
        groups[layer.group].push({ type: layer.type, label: layer.label, count });
    }
    return groups;
});

const totalLayerCount = computed(() =>
    Object.values(layerGroups.value).reduce((sum, items) => sum + items.reduce((s, i) => s + i.count, 0), 0),
);

const alarmCount = computed(() => props.alarms?.length ?? 0);
const criticalAlarmCount = computed(() => props.alarms?.filter((a) => a.severity === 'critical').length ?? 0);
</script>

<template>
    <Head title="Network Map" />

    <div class="flex h-screen flex-col bg-[#F5F7FA] text-[#0B1220]">
        <!-- Top Bar -->
        <header class="flex h-14 shrink-0 items-center gap-4 border-b border-[#DDE3EC] bg-white px-4">
            <span class="text-lg font-semibold tracking-tight">FiberOS</span>
            <div class="relative w-full max-w-md">
                <Input
                    v-model="searchQuery"
                    placeholder="Search devices, customers, POPs, fibers..."
                    class="h-9"
                />
                <div
                    v-if="searchResults.length"
                    class="absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-[#DDE3EC] bg-white shadow-md"
                >
                    <button
                        v-for="hit in searchResults"
                        :key="`${hit.type}-${hit.id}`"
                        class="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-[#EDF0F5]"
                        @click="selectAsset(hit)"
                    >
                        <span class="font-mono">{{ hit.code }}</span>
                        <span class="text-[#6B7789]">{{ hit.label }}</span>
                    </button>
                </div>
            </div>
            <div class="ml-auto flex items-center gap-3">
                <span class="relative inline-flex">
                    <button class="flex h-8 w-8 items-center justify-center rounded-md border border-[#DDE3EC] text-[#6B7789] hover:bg-[#EDF0F5]">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    </button>
                    <span
                        v-if="criticalAlarmCount > 0"
                        class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#E5484D] text-[10px] font-bold text-white"
                    >
                        {{ criticalAlarmCount }}
                    </span>
                </span>
                <button class="h-8 rounded-md bg-[#2563EB] px-3 text-sm font-medium text-white hover:bg-[#1D4ED8]">
                    Quick add
                </button>
                <span class="flex h-8 items-center gap-2 rounded-md border border-[#DDE3EC] px-3 text-sm">
                    <span class="h-5 w-5 rounded-full bg-[#2563EB]"></span>
                    ADM1013-10
                </span>
            </div>
        </header>

        <div class="grid min-h-0 flex-1 grid-cols-[248px_1fr_336px]">
            <!-- Left Sidebar: Layers -->
            <aside class="overflow-y-auto border-r border-[#DDE3EC] bg-white p-3">
                <div class="mb-4 flex items-center justify-between">
                    <h2 class="text-sm font-semibold tracking-tight">Layers</h2>
                    <span class="text-xs text-[#6B7789]">{{ totalLayerCount }} assets</span>
                </div>

                <div v-for="(items, group) in layerGroups" :key="group" class="mb-3">
                    <div class="mb-1 flex items-center justify-between">
                        <span class="text-[11px] font-semibold uppercase tracking-wider text-[#6B7789]">
                            {{ group }}
                        </span>
                        <span class="text-[10px] text-[#94A0B4]">
                            {{ items.reduce((s, i) => s + i.count, 0) }}
                        </span>
                    </div>
                    <div class="space-y-0.5">
                        <label
                            v-for="item in items"
                            :key="item.type"
                            class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-[#EDF0F5]"
                        >
                            <Checkbox v-model="visibleLayers[item.type]" class="h-3.5 w-3.5" />
                            <span class="flex-1 text-sm">{{ item.label }}</span>
                            <span class="text-xs text-[#6B7789]">{{ item.count }}</span>
                        </label>
                    </div>
                </div>

                <Separator class="my-3" />

                <!-- Status Filter -->
                <section>
                    <h2 class="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#6B7789]">
                        Status
                    </h2>
                    <div class="flex gap-1 rounded-md bg-[#F5F7FA] p-1">
                        <button
                            v-for="option in [{ value: 'all', label: 'All' }, { value: 'active', label: 'Active' }, { value: 'offline', label: 'Offline' }]"
                            :key="option.value"
                            type="button"
                            class="flex-1 rounded px-2 py-1 text-xs font-medium transition-colors"
                            :class="statusFilter === option.value
                                ? 'bg-white text-[#0B1220] shadow-sm'
                                : 'text-[#6B7789] hover:text-[#0B1220]'"
                            @click="statusFilter = option.value as 'all' | 'active' | 'offline'"
                        >
                            {{ option.label }}
                        </button>
                    </div>
                </section>

                <Separator class="my-3" />

                <!-- Fault Simulation -->
                <section>
                    <h2 class="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#6B7789]">
                        Network Health
                        <span v-if="faultActive" class="relative flex h-1.5">
                            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E5484D] opacity-75" />
                            <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#E5484D]" />
                        </span>
                    </h2>
                    <div class="rounded-md border border-[#DDE3EC] p-3">
                        <div class="flex items-center justify-between gap-3">
                            <Label for="fault-toggle" class="text-sm font-normal">Simulate fiber cut</Label>
                            <Switch id="fault-toggle" v-model="faultActive" class="shrink-0" />
                        </div>
                    </div>
                </section>
            </aside>

            <!-- Map Area -->
            <main class="relative min-w-0">
                <!-- Map Toolbar -->
                <div class="flex items-center gap-3 flex-wrap border-b border-[#DDE3EC] bg-white px-4 py-2">
                    <div class="flex items-center gap-1 rounded-md border border-[#DDE3EC] bg-[#F5F7FA] p-0.5">
                        <button
                            v-for="mode in ['Location', 'Network', 'Logical', 'Coordinates']"
                            :key="mode"
                            type="button"
                            class="rounded px-2.5 py-1 text-xs font-medium transition-colors"
                            :class="mode === 'Location' ? 'bg-white text-[#0B1220] shadow-sm' : 'text-[#6B7789] hover:text-[#0B1220]'"
                        >
                            {{ mode }}
                        </button>
                    </div>
                    <div class="flex items-center gap-1 rounded-md border border-[#DDE3EC] bg-[#F5F7FA] p-0.5">
                        <button
                            v-for="tool in ['Select', 'Add', 'Draw', 'Measure', 'Trace', 'Impact']"
                            :key="tool"
                            type="button"
                            class="rounded px-2 py-1 text-xs font-medium text-[#6B7789] hover:text-[#0B1220]"
                            :class="tool === 'Select' ? 'bg-white text-[#0B1220] shadow-sm' : ''"
                        >
                            {{ tool }}
                        </button>
                    </div>
                    <span class="flex-1"></span>
                    <span class="inline-flex items-center gap-1.5 rounded-full bg-[#E6F9FC] px-2.5 py-1 text-xs font-medium text-[#016E82]">
                        <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00B8D9]" />
                        Live telemetry
                    </span>
                </div>

                <NetworkMapCanvas
                    :layers="filteredLayers"
                    :visible-layers="visibleLayers"
                    :selected="selected"
                    :traced-ids="tracedIds"
                    :fly-to="flyTo"
                    :pulse-route="pulseRoute"
                    :fault="fault"
                    @select="onMapSelect"
                />

                <!-- Fiber Legend Overlay -->
                <div class="absolute bottom-4 left-4 z-10 flex flex-col gap-2 rounded-md border border-[#DDE3EC] bg-white/90 p-3 shadow-sm backdrop-blur-sm">
                    <span class="text-[10px] font-semibold uppercase tracking-wider text-[#6B7789]">Fiber</span>
                    <div class="flex flex-col gap-1.5">
                        <span class="flex items-center gap-2 text-xs text-[#4A5567]">
                            <span class="h-0.5 w-5 rounded bg-[#2563EB]" /> Feeder
                        </span>
                        <span class="flex items-center gap-2 text-xs text-[#4A5567]">
                            <span class="h-0.5 w-5 rounded bg-[#00B8D9]" /> Distribution
                        </span>
                        <span class="flex items-center gap-2 text-xs text-[#4A5567]">
                            <span class="w-5 border-t-2 border-dashed border-[#94A0B4]" /> Drop
                        </span>
                    </div>
                </div>
            </main>

            <!-- Right Panel -->
            <aside class="flex min-w-0 flex-col border-l border-[#DDE3EC] bg-white">
                <!-- Tabs -->
                <div class="flex shrink-0 border-b border-[#DDE3EC] p-2">
                    <button
                        v-for="tab in [{ id: 'layers', label: 'Layers' }, { id: 'details', label: 'Details' }, { id: 'trace', label: 'Trace' }]"
                        :key="tab.id"
                        type="button"
                        class="flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
                        :class="activeTab === tab.id ? 'bg-[#2563EB] text-white' : 'text-[#6B7789] hover:bg-[#EDF0F5]'"
                        @click="activeTab = tab.id as 'layers' | 'details' | 'trace'"
                    >
                        {{ tab.label }}
                    </button>
                </div>

                <!-- Layers Tab -->
                <div v-if="activeTab === 'layers'" class="flex-1 overflow-y-auto p-3">
                    <div class="mb-3 flex items-center justify-between">
                        <span class="text-xs text-[#6B7789]">Layer counts come from inventory</span>
                    </div>
                    <div v-for="(items, group) in layerGroups" :key="group" class="mb-3">
                        <div class="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#6B7789]">
                            {{ group }}
                        </div>
                        <div v-for="item in items" :key="item.type" class="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-[#EDF0F5]">
                            <span class="text-sm">{{ item.label }}</span>
                            <span class="text-xs text-[#6B7789]">{{ item.count }}</span>
                        </div>
                    </div>
                </div>

                <!-- Details Tab -->
                <div v-else-if="activeTab === 'details'" class="flex-1 overflow-y-auto">
                    <AssetDetailPanel
                        v-if="selected"
                        :asset-type="selected.type"
                        :customer="selected.type === 'customer' ? details.customer[selected.id] : undefined"
                        :splitter="selected.type === 'splitter' ? details.splitter[selected.id] : undefined"
                        :fiber="selected.type === 'fiber' ? details.fiber[selected.id] : undefined"
                        :olt="selected.type === 'olt' ? details.olt[selected.id] : undefined"
                        :closure="selected.type === 'closure' ? details.closure[selected.id] : undefined"
                        :fdb="selected.type === 'fdb' ? details.fdb[selected.id] : undefined"
                        :odf="selected.type === 'odf' ? details.odf[selected.id] : undefined"
                        :rack="selected.type === 'rack' ? details.rack[selected.id] : undefined"
                        :router="selected.type === 'router' ? details.router[selected.id] : undefined"
                        :switch-detail="selected.type === 'switch' ? details.switch[selected.id] : undefined"
                        :pole="selected.type === 'pole' ? details.pole[selected.id] : undefined"
                        :manhole="selected.type === 'manhole' ? details.manhole[selected.id] : undefined"
                        :incident="selected.type === 'incident' ? details.incident[selected.id] : undefined"
                        :impact="impact"
                        :tracing="tracing"
                        :loading-impact="loadingImpact"
                        @trace="runTrace"
                        @impact="runImpact"
                    />
                    <div v-else class="flex items-center justify-center p-6 text-center text-sm text-[#6B7789]">
                        Search or click an asset on the map to see details.
                    </div>
                </div>

                <!-- Trace Tab -->
                <div v-else-if="activeTab === 'trace'" class="flex-1 overflow-y-auto">
                    <div v-if="trace" class="p-3">
                        <TraceBar :steps="trace" :revealed-count="revealedCount" />
                    </div>
                    <div v-else class="flex items-center justify-center p-6 text-center text-sm text-[#6B7789]">
                        Select a customer and run Trace to follow the physical path.
                    </div>
                </div>

                <!-- Bottom Incident Bar -->
                <div
                    v-if="activeIncident"
                    class="flex shrink-0 items-center gap-3 border-t border-[#DDE3EC] bg-[#F5F7FA] p-3"
                >
                    <span class="h-2 w-2 rounded-full bg-[#E5484D]" />
                    <span class="flex-1 text-sm">
                        <span class="font-medium">{{ activeIncident.code }} · {{ activeIncident.type }}</span>
                        <span class="block text-xs text-[#6B7789]">
                            {{ activeIncident.affected_subscribers }} subscribers affected
                        </span>
                    </span>
                    <button class="rounded-md border border-[#DDE3EC] bg-white px-3 py-1 text-xs font-medium hover:bg-[#EDF0F5]">
                        Open
                    </button>
                </div>
            </aside>
        </div>
    </div>
</template>
