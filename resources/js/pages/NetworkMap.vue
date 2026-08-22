<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { computed, reactive, ref } from 'vue';
import AssetDetailPanel from '@/components/network/AssetDetailPanel.vue';
import NetworkMapCanvas from '@/components/network/NetworkMapCanvas.vue';
import TraceBar from '@/components/network/TraceBar.vue';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import NetworkTraceController from '@/actions/App/Http/Controllers/NetworkTraceController';
import SplitterImpactController from '@/actions/App/Http/Controllers/SplitterImpactController';
import FiberImpactController from '@/actions/App/Http/Controllers/FiberImpactController';
import type { AssetType, FiberImpact, NetworkDetails, NetworkLayers, SelectedAsset, SplitterImpact, TraceStep } from '@/types/network';

const props = defineProps<{
    layers: NetworkLayers;
    details: NetworkDetails;
}>();

const LAYER_LABELS: { type: AssetType; label: string }[] = [
    { type: 'pop', label: 'POP' },
    { type: 'olt', label: 'OLT' },
    { type: 'fiber', label: 'Fiber' },
    { type: 'closure', label: 'Closure' },
    { type: 'splitter', label: 'Splitter' },
    { type: 'customer', label: 'Customer' },
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

const GEOMETRIC_LAYER_KEY: Partial<Record<TraceStep['type'], Exclude<keyof NetworkLayers, 'connectors'>>> = {
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

    const feature = props.layers[layerKey].features.find((f) => f.properties.id === step.id);
    if (!feature) return null;

    return feature.geometry.type === 'Point' ? [feature.geometry.coordinates] : feature.geometry.coordinates;
}

// The internal `onu`, `splitter_port`, and `pon` trace steps have no map geometry of their own —
// the pulse route only needs the physical hops, walked downstream (source to customer).
const pulseRoute = computed<[number, number][] | null>(() => {
    if (!trace.value || tracing.value) return null;

    const downstream = [...trace.value].reverse();
    const coordinates = downstream.flatMap((step) => coordinatesFor(step) ?? []);
    return coordinates.length >= 2 ? coordinates : null;
});

type SearchHit = { type: AssetType; id: number; code: string; label: string; coordinates: [number, number] };

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
    const collect = (type: AssetType, key: Exclude<keyof NetworkLayers, 'connectors'>, label: (props: Record<string, unknown>) => string) => {
        for (const feature of props.layers[key].features) {
            const coordinates =
                feature.geometry.type === 'Point' ? feature.geometry.coordinates : feature.geometry.coordinates[0];
            hits.push({ type, id: feature.properties.id, code: feature.properties.code, label: label(feature.properties), coordinates });
        }
    };
    collect('customer', 'customers', (p) => p.name as string);
    collect('splitter', 'splitters', (p) => p.type as string);
    collect('fiber', 'fibers', (p) => p.type as string);
    collect('olt', 'olts', (p) => p.name as string);
    collect('pop', 'pops', (p) => p.name as string);
    return hits;
});

const searchResults = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) return [];
    return searchIndex.value.filter((hit) => hit.code.toLowerCase().includes(query) || hit.label.toLowerCase().includes(query)).slice(0, 8);
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
}

function onMapSelect(type: AssetType, id: number) {
    clearTrace();
    impact.value = null;
    selected.value = { type, id };
}

async function runTrace() {
    if (selected.value?.type !== 'customer') return;
    clearTrace();
    tracing.value = true;

    const response = await fetch(NetworkTraceController.url(selected.value.id));
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
        const response = await fetch(SplitterImpactController.url(selected.value.id));
        impact.value = await response.json();
    } else if (selected.value.type === 'fiber') {
        const response = await fetch(FiberImpactController.url(selected.value.id));
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
                <div
                    v-if="searchResults.length"
                    class="absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-border bg-popover shadow-md"
                >
                    <button
                        v-for="hit in searchResults"
                        :key="`${hit.type}-${hit.id}`"
                        class="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-accent"
                        @click="selectAsset(hit)"
                    >
                        <span class="font-mono">{{ hit.code }}</span>
                        <span class="text-muted-foreground">{{ hit.label }}</span>
                    </button>
                </div>
            </div>
        </header>

        <div class="grid min-h-0 flex-1 grid-cols-[220px_1fr_320px]">
            <aside class="overflow-y-auto border-r border-border p-4">
                <h2 class="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">Map Layers</h2>
                <div class="mb-6 space-y-2">
                    <div v-for="layer in LAYER_LABELS" :key="layer.type" class="flex items-center gap-2">
                        <Checkbox :id="`layer-${layer.type}`" v-model="visibleLayers[layer.type]" />
                        <Label :for="`layer-${layer.type}`" class="text-sm font-normal">{{ layer.label }}</Label>
                    </div>
                </div>

                <h2 class="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">Status</h2>
                <div class="space-y-2 text-sm">
                    <label class="flex items-center gap-2"><input type="radio" value="all" v-model="statusFilter" /> All</label>
                    <label class="flex items-center gap-2"><input type="radio" value="active" v-model="statusFilter" /> Active</label>
                    <label class="flex items-center gap-2"><input type="radio" value="offline" v-model="statusFilter" /> Offline</label>
                </div>
            </aside>

            <main class="relative min-w-0">
                <NetworkMapCanvas
                    :layers="filteredLayers"
                    :visible-layers="visibleLayers"
                    :selected="selected"
                    :traced-ids="tracedIds"
                    :fly-to="flyTo"
                    :pulse-route="pulseRoute"
                    @select="onMapSelect"
                />
            </main>

            <aside v-if="selected" class="min-w-0 border-l border-border">
                <AssetDetailPanel
                    :asset-type="selected.type"
                    :customer="selected.type === 'customer' ? details.customer[selected.id] : undefined"
                    :splitter="selected.type === 'splitter' ? details.splitter[selected.id] : undefined"
                    :fiber="selected.type === 'fiber' ? details.fiber[selected.id] : undefined"
                    :olt="selected.type === 'olt' ? details.olt[selected.id] : undefined"
                    :impact="impact"
                    :tracing="tracing"
                    :loading-impact="loadingImpact"
                    @trace="runTrace"
                    @impact="runImpact"
                />
            </aside>
            <aside v-else class="flex min-w-0 items-center justify-center border-l border-border p-6 text-center text-sm text-muted-foreground">
                Search or click an asset on the map to see details.
            </aside>
        </div>

        <footer v-if="trace" class="h-12 shrink-0 border-t border-border">
            <TraceBar :steps="trace" :revealed-count="revealedCount" />
        </footer>
    </div>
</template>
