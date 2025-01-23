<script setup lang="ts">
import productsMockdata from '@/mockdata/products.json'

const products = ref(productsMockdata)
</script>

<template>
    <div class="flex flex-col gap-8 mt-20">
        <CategoryFilter />

        <div
            class="container mx-auto max-w-[1840px] px-4 md:px-0 lg:px-0 xl:px-0 2xl:px-0 mb-8"
        >
            <div class="grid grid-flow-row grid-cols-2 md:grid-cols-4 gap-6">
                <ProductCard
                    v-for="product in products"
                    :key="product.id"
                    :product="product"
                />
            </div>
        </div>
    </div>
</template>
