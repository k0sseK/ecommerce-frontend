<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'

import type { Product } from '@/types/product'

const { t } = useI18n()

const toast = useToast()
const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const { fetchProductById } = productStore
const { addToCart } = cartStore

const productId = route.params.id
const product = ref<Product | null>(null)
const loading = ref<boolean>(true)

const selectedSize = ref<string | null>(null)
const selectedSku = ref<string | null>(null)

const selectedImage = ref<number>(0)

const imageRefs = ref<(HTMLElement | null)[]>([])

const scrollToImage = (index: number) => {
    const targetImage = imageRefs.value[index]
    if (targetImage) {
        targetImage.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        })
    }
}

let observer: IntersectionObserver | null = null

const observeImages = () => {
    if (observer) observer.disconnect()

    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = imageRefs.value.findIndex(
                        (el) => el === entry.target
                    )

                    if (index !== -1 && selectedImage.value !== index) {
                        selectedImage.value = index
                    }
                }
            })
        },
        {
            root: null,
            threshold: 0.5,
        }
    )

    imageRefs.value.forEach((image) => {
        if (image && observer) observer.observe(image)
    })
}

const handleAddToCart = async (product: Product) => {
    if (selectedSize.value && selectedSku.value) {
        await addToCart({
            productId: product._id,
            name: product.name,
            size: selectedSize.value,
            sku: selectedSku.value,
            image: product.images[0],
            price: product.price,
            quantity: 1,
        })

        toast.add({
            severity: 'secondary',
            summary: product.name,
            detail: t('product_added_to_cart'),
            life: 2500,
        })

        selectedSize.value = null
        selectedSku.value = null
    }
}

onMounted(async () => {
    try {
        const data = await fetchProductById(productId as string)
        if (data) {
            product.value = data
        } else {
            showError({
                statusCode: 404,
            })
        }
    } finally {
        loading.value = false
    }
})

onBeforeUnmount(() => {
    if (observer) observer.disconnect()
})
</script>

<template>
    <div class="mt-20">
        <Loading v-if="loading" />

        <div class="px-4 md:px-0 lg:px-0 xl:px-0 2xl:px-0" v-else>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <template v-if="product">
                    <div class="lg:col-span-7">
                        <div class="bg-light-gray w-full flex flex-row">
                            <ProductImageNavigator
                                :images="product.images"
                                :selected-image="selectedImage"
                                @update:selected-image="
                                    (index) => {
                                        selectedImage = index
                                        scrollToImage(index)
                                    }
                                "
                            />

                            <div
                                class="flex flex-col items-center justify-center w-full"
                            >
                                <img
                                    v-for="(image, index) in product.images"
                                    :key="index"
                                    :src="image"
                                    class="max-w-[690px]"
                                    :ref="(el) => (imageRefs[index] = el as HTMLElement)"
                                    @load="observeImages"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-5">
                        <div class="w-full h-full p-6">
                            <div
                                class="flex flex-row items-center justify-between"
                            >
                                <h1 class="text-3xl font-semibold uppercase">
                                    {{ product.name }}
                                </h1>
                                <p>{{ product.price }} {{ $t('currency') }}</p>
                            </div>

                            <Divider />

                            <div class="flex flex-col">
                                <ProductSizeSelection
                                    class="my-5"
                                    :quantity="product.quantity"
                                    v-model:selectedSize="selectedSize"
                                    v-model:selectedSku="selectedSku"
                                />
                                <Divider />

                                <div class="flex flex-col gap-4">
                                    <ProductAccordion
                                        :description="product.description"
                                    />

                                    <Button
                                        :label="$t('add_to_cart')"
                                        :disabled="!selectedSize"
                                        severity="secondary"
                                        class="w-full py-3"
                                        @click="handleAddToCart(product)"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
