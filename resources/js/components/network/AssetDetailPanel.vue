<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type {
    AssetType,
    ClosureDetail,
    CustomerDetail,
    FdbDetail,
    FiberDetail,
    FiberImpact,
    IncidentDetail,
    ManholeDetail,
    OdfDetail,
    OltDetail,
    PoleDetail,
    RackDetail,
    RouterDetail,
    SplitterDetail,
    SplitterImpact,
    SwitchDetail,
} from '@/types/network';

defineProps<{
    assetType: AssetType;
    customer?: CustomerDetail;
    splitter?: SplitterDetail;
    fiber?: FiberDetail;
    olt?: OltDetail;
    closure?: ClosureDetail;
    fdb?: FdbDetail;
    odf?: OdfDetail;
    rack?: RackDetail;
    router?: RouterDetail;
    switchDetail?: SwitchDetail;
    pole?: { code: string; name: string; type: string; height: number; owner: string };
    manhole?: ManholeDetail;
    incident?: IncidentDetail;
    impact: SplitterImpact | FiberImpact | null;
    tracing: boolean;
    loadingImpact: boolean;
}>();

const emit = defineEmits<{
    trace: [];
    impact: [];
}>();

function statusColor(status: string): string {
    switch (status.toLowerCase()) {
        case 'online': case 'active': return 'bg-[#16C784]';
        case 'warning': return 'bg-[#F5A524]';
        case 'critical': case 'offline': return 'bg-[#E5484D]';
        default: return 'bg-[#94A0B4]';
    }
}
</script>

<template>
    <div class="flex h-full flex-col overflow-y-auto">
        <!-- Customer -->
        <template v-if="assetType === 'customer' && customer">
            <div class="border-b border-[#DDE3EC] p-4">
                <div class="mb-2 flex items-center justify-between">
                    <span class="text-xs font-semibold uppercase tracking-wider text-[#6B7789]">Customer</span>
                    <span class="inline-flex items-center gap-1.5 rounded-full bg-[#E8FBF3] px-2 py-0.5 text-xs font-medium text-[#0A7A4F]">
                        <span class="h-1.5 w-1.5 rounded-full" :class="statusColor(customer.status)" />
                        {{ customer.status }}
                    </span>
                </div>
                <h3 class="text-lg font-semibold tracking-tight">{{ customer.code }}</h3>
                <p class="text-sm text-[#6B7789]">{{ customer.name }}</p>
            </div>
            <div class="space-y-0 p-4">
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Phone</span>
                    <span>{{ customer.phone }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Address</span>
                    <span class="text-right">{{ customer.address }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">ONU</span>
                    <span class="font-mono">{{ customer.onu_model }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">ONU Serial</span>
                    <span class="font-mono">{{ customer.onu_serial }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Splitter</span>
                    <span class="font-mono">{{ customer.splitter_code }} / Port {{ customer.splitter_port }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">PON</span>
                    <span class="font-mono">{{ customer.pon_code }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">OLT</span>
                    <span class="font-mono">{{ customer.olt_code }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">POP</span>
                    <span class="font-mono">{{ customer.pop_code }}</span>
                </div>
            </div>

            <!-- Telemetry -->
            <div v-if="customer.telemetry" class="border-t border-[#DDE3EC] bg-[#F5F7FA] p-4">
                <div class="mb-2 flex items-center gap-2">
                    <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00B8D9]" />
                    <span class="text-xs font-medium">Telemetry</span>
                    <span class="ml-auto text-[10px] text-[#6B7789]">
                        {{ customer.telemetry.last_seen ? 'Last seen ' + customer.telemetry.last_seen : 'Never' }}
                    </span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-xs">
                    <div class="flex justify-between">
                        <span class="text-[#6B7789]">Rx Power</span>
                        <span class="font-medium">{{ customer.telemetry.rx_power !== null ? customer.telemetry.rx_power + ' dBm' : '—' }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-[#6B7789]">Tx Power</span>
                        <span class="font-medium">{{ customer.telemetry.tx_power !== null ? customer.telemetry.tx_power + ' dBm' : '—' }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-[#6B7789]">Distance</span>
                        <span class="font-medium">{{ customer.telemetry.distance !== null ? customer.telemetry.distance + ' km' : '—' }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-[#6B7789]">Temp</span>
                        <span class="font-medium">{{ customer.telemetry.temperature !== null ? customer.telemetry.temperature + '°C' : '—' }}</span>
                    </div>
                </div>
            </div>

            <div class="mt-auto border-t border-[#DDE3EC] p-4 space-y-2">
                <Button class="w-full" :disabled="tracing" @click="emit('trace')">
                    {{ tracing ? 'Tracing…' : 'Trace Network' }}
                </Button>
            </div>
        </template>

        <!-- Splitter -->
        <template v-else-if="assetType === 'splitter' && splitter">
            <div class="border-b border-[#DDE3EC] p-4">
                <span class="text-xs font-semibold uppercase tracking-wider text-[#6B7789]">Splitter</span>
                <h3 class="text-lg font-semibold tracking-tight">{{ splitter.code }}</h3>
                <Badge variant="secondary" class="mt-1">{{ splitter.type }}</Badge>
            </div>
            <div class="space-y-0 p-4">
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Parent closure</span>
                    <span class="font-mono">{{ splitter.closure_code }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Input fiber</span>
                    <span class="font-mono">{{ splitter.input_fiber_code }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Occupied ports</span>
                    <span>{{ splitter.occupied_ports }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Available ports</span>
                    <span>{{ splitter.available_ports }}</span>
                </div>
            </div>
            <div class="mt-auto border-t border-[#DDE3EC] p-4 space-y-2">
                <Button class="w-full" :disabled="loadingImpact" @click="emit('impact')">
                    {{ loadingImpact ? 'Analyzing…' : 'Impact Analysis' }}
                </Button>
                <div v-if="impact && impact.asset_type === 'splitter'" class="rounded-md bg-[#F5F7FA] p-3 text-sm">
                    <p class="font-medium">Potentially affected customers: {{ impact.affected_customers }}</p>
                </div>
            </div>
        </template>

        <!-- Fiber -->
        <template v-else-if="assetType === 'fiber' && fiber">
            <div class="border-b border-[#DDE3EC] p-4">
                <span class="text-xs font-semibold uppercase tracking-wider text-[#6B7789]">Fiber Cable</span>
                <h3 class="text-lg font-semibold tracking-tight">{{ fiber.code }}</h3>
                <Badge variant="secondary" class="mt-1">{{ fiber.type }}</Badge>
            </div>
            <div class="space-y-0 p-4">
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Core capacity</span>
                    <span>{{ fiber.core_capacity }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Used cores</span>
                    <span>{{ fiber.used_cores }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Available cores</span>
                    <span>{{ fiber.core_capacity - fiber.used_cores }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Source</span>
                    <span class="font-mono">{{ fiber.source }}</span>
                </div>
            </div>
            <div class="mt-auto border-t border-[#DDE3EC] p-4 space-y-2">
                <Button class="w-full" :disabled="loadingImpact" @click="emit('impact')">
                    {{ loadingImpact ? 'Analyzing…' : 'Impact Analysis' }}
                </Button>
                <div v-if="impact && impact.asset_type === 'fiber'" class="space-y-1 rounded-md bg-[#F5F7FA] p-3 text-sm">
                    <p>Connected splitters: {{ impact.connected_splitters }}</p>
                    <p>Connected ONUs: {{ impact.connected_onus }}</p>
                    <p class="font-medium">Potentially affected customers: {{ impact.affected_customers }}</p>
                </div>
            </div>
        </template>

        <!-- OLT -->
        <template v-else-if="assetType === 'olt' && olt">
            <div class="border-b border-[#DDE3EC] p-4">
                <span class="text-xs font-semibold uppercase tracking-wider text-[#6B7789]">OLT</span>
                <h3 class="text-lg font-semibold tracking-tight">{{ olt.code }}</h3>
                <Badge variant="secondary" class="mt-1">{{ olt.vendor }} {{ olt.model }}</Badge>
            </div>
            <div class="space-y-0 p-4">
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">POP</span>
                    <span class="font-mono">{{ olt.pop_code }}</span>
                </div>
            </div>
        </template>

        <!-- Closure -->
        <template v-else-if="assetType === 'closure' && closure">
            <div class="border-b border-[#DDE3EC] p-4">
                <span class="text-xs font-semibold uppercase tracking-wider text-[#6B7789]">Fiber Closure</span>
                <h3 class="text-lg font-semibold tracking-tight">{{ closure.code }}</h3>
            </div>
            <div class="space-y-0 p-4">
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Fiber</span>
                    <span class="font-mono">{{ closure.fiber_code }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Connected splitters</span>
                    <span>{{ closure.connected_splitters }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Connected customers</span>
                    <span>{{ closure.connected_customers }}</span>
                </div>
            </div>
        </template>

        <!-- FDB -->
        <template v-else-if="assetType === 'fdb' && fdb">
            <div class="border-b border-[#DDE3EC] p-4">
                <div class="mb-2 flex items-center justify-between">
                    <span class="text-xs font-semibold uppercase tracking-wider text-[#6B7789]">FDB / FAT</span>
                    <span class="inline-flex items-center gap-1.5 rounded-full bg-[#E8FBF3] px-2 py-0.5 text-xs font-medium text-[#0A7A4F]">
                        <span class="h-1.5 w-1.5 rounded-full" :class="statusColor(fdb.status)" />
                        {{ fdb.status }}
                    </span>
                </div>
                <h3 class="text-lg font-semibold tracking-tight">{{ fdb.code }}</h3>
                <p class="text-sm text-[#6B7789]">{{ fdb.type }}</p>
            </div>
            <div class="space-y-0 p-4">
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Ports used</span>
                    <span>{{ fdb.ports_used }} / {{ fdb.port_count }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Fed by</span>
                    <span class="font-mono">{{ fdb.fed_by_cable }} / Core {{ fdb.fed_by_core }}</span>
                </div>
            </div>
        </template>

        <!-- ODF -->
        <template v-else-if="assetType === 'odf' && odf">
            <div class="border-b border-[#DDE3EC] p-4">
                <span class="text-xs font-semibold uppercase tracking-wider text-[#6B7789]">ODF</span>
                <h3 class="text-lg font-semibold tracking-tight">{{ odf.code }}</h3>
                <p class="text-sm text-[#6B7789]">{{ odf.name }}</p>
            </div>
            <div class="space-y-0 p-4">
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Ports</span>
                    <span>{{ odf.port_count }} × {{ odf.connector_type }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Rack</span>
                    <span class="font-mono">{{ odf.rack_code }}</span>
                </div>
            </div>
        </template>

        <!-- Rack -->
        <template v-else-if="assetType === 'rack' && rack">
            <div class="border-b border-[#DDE3EC] p-4">
                <span class="text-xs font-semibold uppercase tracking-wider text-[#6B7789]">Rack</span>
                <h3 class="text-lg font-semibold tracking-tight">{{ rack.code }}</h3>
                <p class="text-sm text-[#6B7789]">{{ rack.name }}</p>
            </div>
            <div class="space-y-0 p-4">
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Units</span>
                    <span>{{ rack.occupied_units }} / {{ rack.rack_units }}U</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">POP</span>
                    <span class="font-mono">{{ rack.pop_code }}</span>
                </div>
            </div>
        </template>

        <!-- Router -->
        <template v-else-if="assetType === 'router' && router">
            <div class="border-b border-[#DDE3EC] p-4">
                <span class="text-xs font-semibold uppercase tracking-wider text-[#6B7789]">Router</span>
                <h3 class="text-lg font-semibold tracking-tight">{{ router.code }}</h3>
                <p class="text-sm text-[#6B7789]">{{ router.vendor }} {{ router.model }}</p>
            </div>
            <div class="space-y-0 p-4">
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Management IP</span>
                    <span class="font-mono">{{ router.management_ip }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Rack</span>
                    <span class="font-mono">{{ router.rack_code }}</span>
                </div>
            </div>
        </template>

        <!-- Switch -->
        <template v-else-if="assetType === 'switch' && switchDetail">
            <div class="border-b border-[#DDE3EC] p-4">
                <span class="text-xs font-semibold uppercase tracking-wider text-[#6B7789]">Switch</span>
                <h3 class="text-lg font-semibold tracking-tight">{{ switchDetail.code }}</h3>
                <p class="text-sm text-[#6B7789]">{{ switchDetail.vendor }} {{ switchDetail.model }}</p>
            </div>
            <div class="space-y-0 p-4">
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Management IP</span>
                    <span class="font-mono">{{ switchDetail.management_ip }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Rack</span>
                    <span class="font-mono">{{ switchDetail.rack_code }}</span>
                </div>
            </div>
        </template>

        <!-- Incident -->
        <template v-else-if="assetType === 'incident' && incident">
            <div class="border-b border-[#DDE3EC] p-4">
                <div class="mb-2 flex items-center justify-between">
                    <span class="text-xs font-semibold uppercase tracking-wider text-[#6B7789]">Incident</span>
                    <span class="inline-flex items-center gap-1.5 rounded-full bg-[#FDECED] px-2 py-0.5 text-xs font-medium text-[#961F23]">
                        <span class="h-1.5 w-1.5 rounded-full bg-[#E5484D]" />
                        {{ incident.severity }}
                    </span>
                </div>
                <h3 class="text-lg font-semibold tracking-tight">{{ incident.code }}</h3>
                <p class="text-sm text-[#6B7789]">{{ incident.type }}</p>
            </div>
            <div class="space-y-0 p-4">
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Affected subscribers</span>
                    <span class="font-medium">{{ incident.affected_subscribers }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">First detected</span>
                    <span>{{ incident.first_detected }}</span>
                </div>
                <div class="flex justify-between border-b border-[#DDE3EC] py-2 text-sm">
                    <span class="text-[#6B7789]">Duration</span>
                    <span>{{ incident.duration }}</span>
                </div>
            </div>
            <div class="p-4">
                <p class="text-sm text-[#4A5567]">{{ incident.description }}</p>
            </div>
        </template>

        <!-- Fallback for other types -->
        <template v-else>
            <div class="p-4 text-sm text-[#6B7789]">
                Select an asset on the map to view its details.
            </div>
        </template>
    </div>
</template>
