<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const productId = route.params.id

const selectedImage = ref<number>(0)
const images = ref<string[]>([
    'https://i.imgur.com/5lX95H5.png',
    'https://i.imgur.com/Qh2MtRB.jpeg',
])

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

onMounted(() => {
    observeImages()
})

onBeforeUnmount(() => {
    if (observer) observer.disconnect()
})
</script>

<template>
    <div class="mt-20">
        <div class="px-4 md:px-0 lg:px-0 xl:px-0 2xl:px-0">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div class="lg:col-span-7">
                    <div class="bg-light-gray w-full flex flex-row">
                        <ProductImageNavigator
                            :images="images"
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
                                v-for="(image, index) in images"
                                :key="index"
                                :src="image"
                                class="max-w-[690px]"
                                :ref="(el) => (imageRefs[index] = el as HTMLElement)"
                            />
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-5">
                    <div class="w-full h-full p-6">
                        <div class="flex flex-row items-center justify-between">
                            <h1 class="text-3xl font-semibold uppercase">
                                BAMBOO WATCH
                            </h1>
                            <p>199.99 {{ $t('currency') }}</p>
                        </div>

                        <Divider />

                        <div class="flex flex-col">
                            <ProductSizeSelection class="my-5" />
                            <Divider />

                            <div class="flex flex-col gap-4">
                                <ProductAccordion />

                                <Button
                                    :label="$t('add_to_cart')"
                                    severity="secondary"
                                    class="w-full py-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
