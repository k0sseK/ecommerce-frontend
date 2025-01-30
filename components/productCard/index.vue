<script setup lang="ts">
defineProps(['product'])
</script>

<template>
    <div
        class="flex flex-col justify-center cursor-pointer group"
        @click="navigateTo({ name: 'product-id', params: { id: product._id } })"
    >
        <div class="relative mx-auto mb-3 w-full overflow-hidden bg-light-gray">
            <img
                src="https://i.imgur.com/5lX95H5.png"
                :alt="product.name"
                class="w-full transform transition-transform duration-300 ease-in-out group-hover:scale-90"
            />

            <Tag
                :value="$t('out_of_stock')"
                :severity="
                    isOutOfStock(product.quantity) ? 'secondary' : undefined
                "
                class="absolute"
                style="left: 5px; top: 5px"
                v-if="isOutOfStock(product.quantity)"
            />
        </div>

        <div class="flex flex-col items-center">
            <span class="font-light uppercase">
                {{ product.name }}
            </span>
            <span>{{ product.price }} {{ $t('currency') }}</span>
        </div>
    </div>
</template>
