<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()

const { lastProducts } = storeToRefs(productStore)
const { fetchLastProducts } = productStore

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

onMounted(() => {
    fetchLastProducts()
})
</script>

<template>
    <div>
        <Carousel
            :value="lastProducts"
            :numVisible="4"
            :numScroll="1"
            :responsiveOptions="responsiveOptions"
            :showNavigators="false"
            containerClass="flex items-center"
        >
            <template #item="slotProps">
                <div
                    :class="{
                        'mx-3':
                            slotProps.index !== 0 &&
                            slotProps.index !== lastProducts.length - 1,
                        'ml-3': slotProps.index === lastProducts.length - 1,
                        'mr-3': slotProps.index === 0,
                    }"
                    class="cursor-pointer group"
                    @click="
                        navigateTo({
                            name: 'product-id',
                            params: { id: slotProps.data._id },
                        })
                    "
                >
                    <div class="mb-3">
                        <div
                            class="relative mx-auto overflow-hidden bg-light-gray"
                        >
                            <img
                                src="https://i.imgur.com/5lX95H5.png"
                                :alt="slotProps.data.name"
                                class="w-[full] h-[32rem] transform transition-transform duration-300 ease-in-out group-hover:scale-90"
                            />

                            <Tag
                                :value="$t('out_of_stock')"
                                :severity="
                                    isOutOfStock(slotProps.data.quantity)
                                        ? 'secondary'
                                        : undefined
                                "
                                class="absolute"
                                style="left: 5px; top: 5px"
                                v-if="isOutOfStock(slotProps.data.quantity)"
                            />
                        </div>
                    </div>

                    <div class="flex flex-col items-center">
                        <span class="font-light uppercase">
                            {{ slotProps.data.name }}
                        </span>
                        <span>
                            {{ slotProps.data.price }} {{ $t('currency') }}
                        </span>
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<style scoped>
:deep(.p-carousel-indicator-active) {
    button {
        background-color: white;
        border: none;
    }
}

.carousel-item {
    flex-shrink: 0; /* Ensure each item doesn't shrink */
    width: auto; /* Let items take their natural width */
}
</style>
