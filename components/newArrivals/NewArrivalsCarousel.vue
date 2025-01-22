<script setup lang="ts">
import productsMockdata from '@/mockdata/products.json'

const products = ref(productsMockdata)
const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
    },
])
</script>

<template>
    <div>
        <Carousel
            :value="products"
            :numVisible="4"
            :numScroll="1"
            :responsiveOptions="responsiveOptions"
            :showNavigators="false"
        >
            <template #item="slotProps">
                <div
                    :class="{
                        'mx-3':
                            slotProps.index !== 0 &&
                            slotProps.index !== products.length - 1,
                        'ml-3': slotProps.index === products.length - 1,
                        'mr-3': slotProps.index === 0,
                    }"
                    class="cursor-pointer group"
                >
                    <div class="mb-3">
                        <div
                            class="relative mx-auto overflow-hidden bg-light-gray"
                        >
                            <img
                                src="https://i.imgur.com/5lX95H5.png"
                                :alt="slotProps.data.name"
                                class="w-full h-[32rem] transform transition-transform duration-300 ease-in-out group-hover:scale-90"
                            />

                            <Tag
                                :value="$t(slotProps.data.inventoryStatus)"
                                :severity="
                                    getStockSeverity(
                                        slotProps.data.inventoryStatus
                                    )
                                "
                                class="absolute"
                                style="left: 5px; top: 5px"
                                v-if="
                                    slotProps.data.inventoryStatus ===
                                    'out_of_stock'
                                "
                            />
                        </div>
                    </div>

                    <div class="flex flex-col items-center">
                        <span class="font-light uppercase">
                            {{ slotProps.data.name }}
                        </span>
                        <span>
                            {{ $t('currency') }}{{ slotProps.data.price }}
                        </span>
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<style scoped>
::v-deep(.p-carousel-indicator-active) {
    button {
        background-color: white;
        border: none;
    }
}
</style>
