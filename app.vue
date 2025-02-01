<script setup lang="ts">
import { useCartStore } from '@/stores/cart'

const { t } = useI18n()

useSeoMeta({
    title: t('shop_name'),
    ogTitle: t('shop_name'),
    description: t('shop_description'),
    ogDescription: t('shop_description'),
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
})

const cartStore = useCartStore()
const { fetchCart } = cartStore

await fetchCart()
</script>
<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
