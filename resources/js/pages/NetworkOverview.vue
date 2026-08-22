<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import NetworkMapController from '@/actions/App/Http/Controllers/NetworkMapController';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

defineProps<{
    metrics: {
        total_customers: number;
        active_customers: number;
        offline_customers: number;
        total_splitters: number;
        port_utilization: number;
        total_fiber_length_meters: number;
    };
}>();
</script>

<template>
    <Head title="Network Overview" />

    <div class="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-10">
        <header class="flex items-center justify-between">
            <div>
                <p class="text-sm text-muted-foreground">FiberOS</p>
                <h1 class="text-2xl font-semibold tracking-tight">
                    Network Overview
                </h1>
            </div>
            <Button as-child>
                <Link :href="NetworkMapController.index.url()"
                    >Open Network Map</Link
                >
            </Button>
        </header>

        <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
            <Card>
                <CardHeader class="pb-2">
                    <CardTitle class="text-sm font-normal text-muted-foreground"
                        >Customers</CardTitle
                    >
                </CardHeader>
                <CardContent class="text-2xl font-semibold">{{
                    metrics.total_customers
                }}</CardContent>
            </Card>
            <Card>
                <CardHeader class="pb-2">
                    <CardTitle class="text-sm font-normal text-muted-foreground"
                        >Active</CardTitle
                    >
                </CardHeader>
                <CardContent class="text-2xl font-semibold text-[#16c784]">{{
                    metrics.active_customers
                }}</CardContent>
            </Card>
            <Card>
                <CardHeader class="pb-2">
                    <CardTitle class="text-sm font-normal text-muted-foreground"
                        >Offline</CardTitle
                    >
                </CardHeader>
                <CardContent class="text-2xl font-semibold text-destructive">{{
                    metrics.offline_customers
                }}</CardContent>
            </Card>
            <Card>
                <CardHeader class="pb-2">
                    <CardTitle class="text-sm font-normal text-muted-foreground"
                        >Splitters</CardTitle
                    >
                </CardHeader>
                <CardContent class="text-2xl font-semibold">{{
                    metrics.total_splitters
                }}</CardContent>
            </Card>
            <Card>
                <CardHeader class="pb-2">
                    <CardTitle class="text-sm font-normal text-muted-foreground"
                        >Port utilization</CardTitle
                    >
                </CardHeader>
                <CardContent class="text-2xl font-semibold"
                    >{{ metrics.port_utilization }}%</CardContent
                >
            </Card>
            <Card>
                <CardHeader class="pb-2">
                    <CardTitle class="text-sm font-normal text-muted-foreground"
                        >Fiber deployed</CardTitle
                    >
                </CardHeader>
                <CardContent class="text-2xl font-semibold"
                    >{{
                        (metrics.total_fiber_length_meters / 1000).toFixed(2)
                    }}
                    km</CardContent
                >
            </Card>
        </div>
    </div>
</template>
