<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import { categories } from '@/config/categories'
import type { Category } from '@/types/category'

const productStore = useProductStore()

const { products } = storeToRefs(productStore)
const { fetchProducts } = productStore

const router = useRouter()
const route = useRoute()

const loading = ref<boolean>(true)

onMounted(() => {
    const category = route.params.category || 'all'

    if (!categories.includes(category as Category)) {
        router.push({ name: 'shop-category', params: { category: 'all' } })
    } else {
        fetchProducts(category as Category).finally(() => {
            loading.value = false
        })
    }
})
</script>

<template>
    <div class="flex flex-col gap-8 mt-20">
        <CategoryFilter />

        <div
            class="container mx-auto max-w-[1840px] px-4 md:px-0 lg:px-0 xl:px-0 2xl:px-0 mb-8"
        >
            <div v-if="loading" class="flex justify-center items-center py-12">
                <ProgressSpinner
                    style="width: 50px; height: 50px"
                    strokeWidth="3"
                    animationDuration=".5s"
                />
            </div>

            <template v-else>
                <div
                    class="grid grid-flow-row grid-cols-2 md:grid-cols-4 gap-6"
                    v-if="products.length > 0"
                >
                    <ProductCard
                        v-for="product in products"
                        :key="product.id"
                        :product="product"
                    />
                </div>
                <div v-else>
                    <h1 class="text-center text-md">
                        {{ $t('shop_no_data') }}
                    </h1>
                </div>
            </template>
        </div>
    </div>
</template>
