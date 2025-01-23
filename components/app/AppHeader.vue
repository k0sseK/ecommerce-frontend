<script setup lang="ts">
const route = useRoute()
</script>

<template>
    <header class="absolute top-0 w-full z-20">
        <div
            class="container mx-auto max-w-[1840px] flex flex-row items-center justify-between h-20"
        >
            <div class="w-20">
                <span
                    class="uppercase cursor-pointer hover:underline"
                    @click="navigateTo('/shop')"
                    v-if="route.name === 'product-id'"
                >
                    {{ $t('shop') }}
                </span>
            </div>
            <div class="w-33 text-center">
                <h1
                    class="text-4xl font-medium tracking-wide cursor-pointer"
                    @click="navigateTo('/')"
                >
                    {{ $t('shop_name') }}
                </h1>
            </div>
            <div class="w-20 flex flex-row items-center gap-3">
                <LanguageSelector />
                <BasketDrawer />
            </div>
        </div>
    </header>
</template>
