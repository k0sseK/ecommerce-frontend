<script setup lang="ts">
defineProps(['product'])
</script>

<template>
    <div
        class="flex flex-col justify-center cursor-pointer group"
        @click="navigateTo({ name: 'product-id', params: { id: product.id } })"
    >
        <div class="relative mx-auto mb-3 w-full overflow-hidden bg-light-gray">
            <img
                src="https://i.imgur.com/5lX95H5.png"
                :alt="product.name"
                class="w-full h-[32rem] transform transition-transform duration-300 ease-in-out group-hover:scale-90"
            />

            <Tag
                :value="$t(product.inventoryStatus)"
                :severity="getStockSeverity(product.inventoryStatus)"
                class="absolute"
                style="left: 5px; top: 5px"
                v-if="product.inventoryStatus === 'out_of_stock'"
            />
        </div>

        <div class="flex flex-col items-center">
            <span class="font-light uppercase">
                {{ product.name }}
            </span>
            <span>{{ $t('currency') }}{{ product.price }}</span>
        </div>
    </div>
</template>
