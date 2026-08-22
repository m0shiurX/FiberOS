<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type {
    AssetType,
    ClosureDetail,
    CustomerDetail,
    FiberDetail,
    FiberImpact,
    OltDetail,
    SplitterDetail,
    SplitterImpact,
} from '@/types/network';

defineProps<{
    assetType: AssetType;
    customer?: CustomerDetail;
    splitter?: SplitterDetail;
    fiber?: FiberDetail;
    olt?: OltDetail;
    closure?: ClosureDetail;
    impact: SplitterImpact | FiberImpact | null;
    tracing: boolean;
    loadingImpact: boolean;
}>();

const emit = defineEmits<{
    trace: [];
    impact: [];
}>();
</script>

<template>
    <Card
        class="h-full overflow-y-auto rounded-none border-0 border-l shadow-none"
    >
        <CardHeader v-if="assetType === 'customer' && customer">
            <CardTitle class="font-mono text-base">{{
                customer.code
            }}</CardTitle>
            <Badge
                :variant="
                    customer.status === 'Active' ? 'default' : 'destructive'
                "
                class="w-fit"
            >
                {{ customer.status }}
            </Badge>
        </CardHeader>
        <CardContent
            v-if="assetType === 'customer' && customer"
            class="space-y-4 text-sm"
        >
            <dl class="space-y-2">
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">Phone</dt>
                    <dd>{{ customer.phone }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">Address</dt>
                    <dd class="text-right">{{ customer.address }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">ONU</dt>
                    <dd class="font-mono">{{ customer.onu_model }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">ONU Serial</dt>
                    <dd class="font-mono">{{ customer.onu_serial }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">Splitter</dt>
                    <dd class="font-mono">{{ customer.splitter_code }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">Port</dt>
                    <dd class="font-mono">{{ customer.splitter_port }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">PON</dt>
                    <dd class="font-mono">{{ customer.pon_code }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">OLT</dt>
                    <dd class="font-mono">{{ customer.olt_code }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">POP</dt>
                    <dd class="font-mono">{{ customer.pop_code }}</dd>
                </div>
            </dl>
            <Button class="w-full" :disabled="tracing" @click="emit('trace')">
                {{ tracing ? 'Tracing…' : 'Trace Network' }}
            </Button>
        </CardContent>

        <CardHeader v-else-if="assetType === 'splitter' && splitter">
            <CardTitle class="font-mono text-base">{{
                splitter.code
            }}</CardTitle>
            <Badge variant="secondary" class="w-fit">{{ splitter.type }}</Badge>
        </CardHeader>
        <CardContent
            v-if="assetType === 'splitter' && splitter"
            class="space-y-4 text-sm"
        >
            <dl class="space-y-2">
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">Parent closure</dt>
                    <dd class="font-mono">{{ splitter.closure_code }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">Input fiber</dt>
                    <dd class="font-mono">{{ splitter.input_fiber_code }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">Occupied ports</dt>
                    <dd>{{ splitter.occupied_ports }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">Available ports</dt>
                    <dd>{{ splitter.available_ports }}</dd>
                </div>
            </dl>
            <Button
                class="w-full"
                :disabled="loadingImpact"
                @click="emit('impact')"
            >
                {{ loadingImpact ? 'Analyzing…' : 'Impact Analysis' }}
            </Button>
            <div
                v-if="impact && impact.asset_type === 'splitter'"
                class="rounded-md border border-border bg-muted/50 p-3 text-sm"
            >
                <p class="font-medium">
                    Potentially affected customers:
                    {{ impact.affected_customers }}
                </p>
            </div>
        </CardContent>

        <CardHeader v-else-if="assetType === 'fiber' && fiber">
            <CardTitle class="font-mono text-base">{{ fiber.code }}</CardTitle>
            <Badge variant="secondary" class="w-fit">{{ fiber.type }}</Badge>
        </CardHeader>
        <CardContent
            v-if="assetType === 'fiber' && fiber"
            class="space-y-4 text-sm"
        >
            <dl class="space-y-2">
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">Core capacity</dt>
                    <dd>{{ fiber.core_capacity }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">Used cores</dt>
                    <dd>{{ fiber.used_cores }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">Available cores</dt>
                    <dd>{{ fiber.core_capacity - fiber.used_cores }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">Source</dt>
                    <dd class="font-mono">{{ fiber.source }}</dd>
                </div>
            </dl>
            <Button
                class="w-full"
                :disabled="loadingImpact"
                @click="emit('impact')"
            >
                {{ loadingImpact ? 'Analyzing…' : 'Impact Analysis' }}
            </Button>
            <div
                v-if="impact && impact.asset_type === 'fiber'"
                class="space-y-1 rounded-md border border-border bg-muted/50 p-3 text-sm"
            >
                <p>Connected splitters: {{ impact.connected_splitters }}</p>
                <p>Connected ONUs: {{ impact.connected_onus }}</p>
                <p class="font-medium">
                    Potentially affected customers:
                    {{ impact.affected_customers }}
                </p>
            </div>
        </CardContent>

        <CardHeader v-else-if="assetType === 'closure' && closure">
            <CardTitle class="font-mono text-base">{{
                closure.code
            }}</CardTitle>
            <Badge variant="secondary" class="w-fit">Splice closure</Badge>
        </CardHeader>
        <CardContent
            v-if="assetType === 'closure' && closure"
            class="space-y-2 text-sm"
        >
            <dl class="space-y-2">
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">Fiber</dt>
                    <dd class="font-mono">{{ closure.fiber_code }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">Connected splitters</dt>
                    <dd>{{ closure.connected_splitters }}</dd>
                </div>
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">Connected customers</dt>
                    <dd>{{ closure.connected_customers }}</dd>
                </div>
            </dl>
        </CardContent>

        <CardHeader v-else-if="assetType === 'olt' && olt">
            <CardTitle class="font-mono text-base">{{ olt.code }}</CardTitle>
            <Badge variant="secondary" class="w-fit"
                >{{ olt.vendor }} {{ olt.model }}</Badge
            >
        </CardHeader>
        <CardContent
            v-if="assetType === 'olt' && olt"
            class="space-y-2 text-sm"
        >
            <dl class="space-y-2">
                <div class="flex justify-between gap-2">
                    <dt class="text-muted-foreground">POP</dt>
                    <dd class="font-mono">{{ olt.pop_code }}</dd>
                </div>
            </dl>
        </CardContent>
    </Card>
</template>
