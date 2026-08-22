<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { computed, reactive, ref } from 'vue';
import FiberImpactController from '@/actions/App/Http/Controllers/FiberImpactController';
import NetworkTraceController from '@/actions/App/Http/Controllers/NetworkTraceController';
import SplitterImpactController from '@/actions/App/Http/Controllers/SplitterImpactController';
import AssetDetailPanel from '@/components/network/AssetDetailPanel.vue';
import NetworkMapCanvas from '@/components/network/NetworkMapCanvas.vue';
import TraceBar from '@/components/network/TraceBar.vue';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { CLOSURE_COLOR, LAYER_COLORS } from '@/lib/network-colors';
import type {
    AssetType,
    FiberImpact,
    NetworkDetails,
    NetworkFault,
    NetworkLayers,
    SelectedAsset,
    SplitterImpact,
    TraceStep,
} from '@/types/network';

const props = defineProps<{
    layers: NetworkLayers;
    details: NetworkDetails;
}>();

const LAYER_LABELS: { type: AssetType; label: string; color: string }[] = [
    { type: 'pop', label: 'POP', color: LAYER_COLORS.pop },
    { type: 'olt', label: 'OLT', color: LAYER_COLORS.olt },
    { type: 'fiber', label: 'Fiber', color: LAYER_COLORS.fiber },
    { type: 'closure', label: 'Closure', color: CLOSURE_COLOR },
    { type: 'splitter', label: 'Splitter', color: LAYER_COLORS.splitter },
    { type: 'customer', label: 'Customer', color: LAYER_COLORS.customer },
];

const STATUS_OPTIONS: { value: 'all' | 'active' | 'offline'; label: string }[] =
    [
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'offline', label: 'Offline' },
    ];

const visibleLayers = reactive<Record<AssetType, boolean>>({
    pop: true,
    olt: true,
    fiber: true,
    closure: true,
    splitter: true,
    customer: true,
});

const statusFilter = ref<'all' | 'active' | 'offline'>('all');

const searchQuery = ref('');
const selected = ref<SelectedAsset | null>(null);
const flyTo = ref<[number, number] | null>(null);

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
    Record<TraceStep['type'], Exclude<keyof NetworkLayers, 'connectors'>>
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

    if (!layerKey) {
        return null;
    }

    const feature = props.layers[layerKey].features.find(
        (f) => f.properties.id === step.id,
    );

    if (!feature) {
        return null;
    }

    return feature.geometry.type === 'Point'
        ? [feature.geometry.coordinates]
        : feature.geometry.coordinates;
}

// The internal `onu`, `splitter_port`, and `pon` trace steps have no map geometry of their own —
// the pulse route only needs the physical hops, walked downstream (source to customer).
const pulseRoute = computed<[number, number][] | null>(() => {
    if (!trace.value || tracing.value) {
        return null;
    }

    const downstream = [...trace.value].reverse();
    const coordinates = downstream.flatMap(
        (step) => coordinatesFor(step) ?? [],
    );

    return coordinates.length >= 2 ? coordinates : null;
});

const faultActive = ref(false);
const FAULT_FIBER_CODE = 'FC-001';

// Simulates a fiber cut for the pitch demo: derives which closure/splitters/customers go dark
// downstream of the break purely from data already on the page (details' code cross-references),
// no extra request needed. The break point is the fiber path's midpoint.
const fault = computed<NetworkFault | null>(() => {
    if (!faultActive.value) {
        return null;
    }

    const fiber = props.layers.fibers.features.find(
        (f) => f.properties.code === FAULT_FIBER_CODE,
    );

    if (!fiber || fiber.geometry.type !== 'LineString') {
        return null;
    }

    const closureIds = props.layers.closures.features
        .filter(
            (f) =>
                props.details.closure[f.properties.id]?.fiber_code ===
                FAULT_FIBER_CODE,
        )
        .map((f) => f.properties.id);

    const splitterFeatures = props.layers.splitters.features.filter(
        (f) =>
            props.details.splitter[f.properties.id]?.input_fiber_code ===
            FAULT_FIBER_CODE,
    );
    const splitterIds = splitterFeatures.map((f) => f.properties.id);
    const splitterCodes = new Set(
        splitterFeatures.map((f) => f.properties.code),
    );

    const customerIds = props.layers.customers.features
        .filter((f) =>
            splitterCodes.has(
                props.details.customer[f.properties.id]?.splitter_code,
            ),
        )
        .map((f) => f.properties.id);

    const coordinates = fiber.geometry.coordinates;

    return {
        fiberId: fiber.properties.id,
        closureIds,
        splitterIds,
        customerIds,
        breakPoint: coordinates[Math.floor(coordinates.length / 2)],
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
    if (statusFilter.value === 'all') {
        return props.layers;
    }

    const wantActive = statusFilter.value === 'active';

    return {
        ...props.layers,
        customers: {
            ...props.layers.customers,
            features: props.layers.customers.features.filter((feature) =>
                wantActive
                    ? feature.properties.status === 'Active'
                    : feature.properties.status !== 'Active',
            ),
        },
    };
});

const searchIndex = computed<SearchHit[]>(() => {
    const hits: SearchHit[] = [];
    const collect = (
        type: AssetType,
        key: Exclude<keyof NetworkLayers, 'connectors'>,
        label: (props: Record<string, unknown>) => string,
    ) => {
        for (const feature of props.layers[key].features) {
            const coordinates =
                feature.geometry.type === 'Point'
                    ? feature.geometry.coordinates
                    : feature.geometry.coordinates[0];
            hits.push({
                type,
                id: feature.properties.id,
                code: feature.properties.code,
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

    return hits;
});

const searchResults = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();

    if (!query) {
        return [];
    }

    return searchIndex.value
        .filter(
            (hit) =>
                hit.code.toLowerCase().includes(query) ||
                hit.label.toLowerCase().includes(query),
        )
        .slice(0, 8);
});

function clearTrace() {
    if (traceTimer) {
        clearInterval(traceTimer);
    }

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
}

function onMapSelect(type: AssetType, id: number) {
    clearTrace();
    impact.value = null;
    selected.value = { type, id };
}

async function runTrace() {
    if (selected.value?.type !== 'customer') {
        return;
    }

    clearTrace();
    tracing.value = true;

    const response = await fetch(NetworkTraceController.url(selected.value.id));
    const data: { path: TraceStep[] } = await response.json();
    trace.value = data.path;

    traceTimer = setInterval(() => {
        if (!trace.value) {
            return;
        }

        revealedCount.value += 1;

        if (revealedCount.value >= trace.value.length) {
            if (traceTimer) {
                clearInterval(traceTimer);
            }

            tracing.value = false;
        }
    }, 350);
}

async function runImpact() {
    if (!selected.value) {
        return;
    }

    loadingImpact.value = true;
    impact.value = null;

    if (selected.value.type === 'splitter') {
        const response = await fetch(
            SplitterImpactController.url(selected.value.id),
        );
        impact.value = await response.json();
    } else if (selected.value.type === 'fiber') {
        const response = await fetch(
            FiberImpactController.url(selected.value.id),
        );
        impact.value = await response.json();
    }

    loadingImpact.value = false;
}
</script>

<template>

    <Head title="Network Map" />

    <div class="flex h-screen flex-col bg-background text-foreground">
        <header class="flex h-14 shrink-0 items-center gap-4 border-b border-border px-4">
            <span class="font-semibold tracking-tight">FiberOS</span>
            <div class="relative w-full max-w-md">
                <Input v-model="searchQuery" placeholder="Search customer, ONU, splitter, fiber, OLT…" class="h-9" />
                <div v-if="searchResults.length"
                    class="absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-border bg-popover shadow-md">
                    <button v-for="hit in searchResults" :key="`${hit.type}-${hit.id}`"
                        class="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-accent"
                        @click="selectAsset(hit)">
                        <span class="font-mono">{{ hit.code }}</span>
                        <span class="text-muted-foreground">{{
                            hit.label
                            }}</span>
                    </button>
                </div>
            </div>
        </header>

        <div class="grid min-h-0 flex-1 grid-cols-[248px_1fr_320px]">
            <aside class="overflow-y-auto border-r border-border p-4">
                <section>
                    <h2 class="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        Map Layers
                    </h2>
                    <div class="space-y-1">
                        <label v-for="layer in LAYER_LABELS" :key="layer.type" :for="`layer-${layer.type}`"
                            class="flex cursor-pointer items-center gap-2.5 rounded-md px-1.5 py-1 hover:bg-accent">
                            <Checkbox :id="`layer-${layer.type}`" v-model="visibleLayers[layer.type]" />
                            <span class="size-2 shrink-0 rounded-full" :style="{ backgroundColor: layer.color }" />
                            <span class="text-sm">{{ layer.label }}</span>
                        </label>
                    </div>
                </section>

                <Separator class="my-4" />

                <section>
                    <h2 class="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        Status
                    </h2>
                    <div class="flex gap-1 rounded-md bg-muted p-1">
                        <button v-for="option in STATUS_OPTIONS" :key="option.value" type="button"
                            class="flex-1 rounded px-2 py-1 text-xs font-medium transition-colors" :class="statusFilter === option.value
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                " @click="statusFilter = option.value">
                            {{ option.label }}
                        </button>
                    </div>
                </section>

                <Separator class="my-4" />

                <section>
                    <h2
                        class="mb-3 flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        Network Health
                        <span v-if="faultActive" class="relative flex size-1.5">
                            <span
                                class="absolute inline-flex size-full animate-ping rounded-full bg-destructive opacity-75" />
                            <span class="relative inline-flex size-1.5 rounded-full bg-destructive" />
                        </span>
                    </h2>
                    <div class="rounded-md border border-border p-3">
                        <div class="flex items-center justify-between gap-3">
                            <Label for="fault-toggle" class="text-sm font-normal">Simulate fiber cut</Label>
                            <Switch id="fault-toggle" v-model="faultActive" class="shrink-0" />
                        </div>
                    </div>
                </section>
            </aside>

            <main class="relative min-w-0">
                <NetworkMapCanvas :layers="filteredLayers" :visible-layers="visibleLayers" :selected="selected"
                    :traced-ids="tracedIds" :fly-to="flyTo" :pulse-route="pulseRoute" :fault="fault"
                    @select="onMapSelect" />
            </main>

            <aside v-if="selected" class="min-w-0 border-l border-border">
                <AssetDetailPanel :asset-type="selected.type" :customer="selected.type === 'customer'
                        ? details.customer[selected.id]
                        : undefined
                    " :splitter="selected.type === 'splitter'
                            ? details.splitter[selected.id]
                            : undefined
                        " :fiber="selected.type === 'fiber'
                            ? details.fiber[selected.id]
                            : undefined
                        " :olt="selected.type === 'olt'
                            ? details.olt[selected.id]
                            : undefined
                        " :closure="selected.type === 'closure'
                            ? details.closure[selected.id]
                            : undefined
                        " :impact="impact" :tracing="tracing" :loading-impact="loadingImpact" @trace="runTrace"
                    @impact="runImpact" />
            </aside>
            <aside v-else
                class="flex min-w-0 items-center justify-center border-l border-border p-6 text-center text-sm text-muted-foreground">
                Search or click an asset on the map to see details.
            </aside>
        </div>

        <footer v-if="trace" class="h-12 shrink-0 border-t border-border">
            <TraceBar :steps="trace" :revealed-count="revealedCount" />
        </footer>
    </div>
</template>
