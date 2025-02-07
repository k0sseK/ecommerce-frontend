<script setup lang="ts">
const route = useRoute()
const orderId = route.query.orderId

if (!orderId) {
    navigateTo('/')
}
</script>

<template>
    <div class="h-screen flex flex-col justify-center items-center">
        <i class="pi pi-check-circle text-9xl text-primary"></i>
        <div class="my-2 mt-6 text-center">
            <p class="text-2xl font-semibold">
                {{ $t('order_payment_complete') }}
            </p>
            <p class="text-md text-neutral-200">
                {{ $t('order_payment_complete_description') }}
            </p>
        </div>

        <Button
            :label="$t('back_to_home')"
            severity="secondary"
            class="px-10"
            @click="navigateTo('/')"
        />
    </div>
</template>
