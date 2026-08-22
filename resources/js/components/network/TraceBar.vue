<script setup lang="ts">
import { ChevronRight } from '@lucide/vue';
import type { TraceStep } from '@/types/network';

defineProps<{
    steps: TraceStep[];
    revealedCount: number;
}>();
</script>

<template>
    <div class="flex h-full items-center gap-2 overflow-x-auto px-4 text-sm">
        <template
            v-for="(step, index) in steps"
            :key="`${step.type}-${step.id}`"
        >
            <span
                class="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono whitespace-nowrap transition-all duration-300"
                :class="
                    index < revealedCount
                        ? 'bg-primary/10 text-primary opacity-100'
                        : 'text-muted-foreground opacity-30'
                "
            >
                {{ step.code }}
            </span>
            <ChevronRight
                v-if="index < steps.length - 1"
                class="size-3.5 shrink-0 text-muted-foreground"
            />
        </template>
    </div>
</template>
