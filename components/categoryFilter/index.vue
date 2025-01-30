<script setup lang="ts">
import { categories } from '@/config/categories'
</script>

<template>
    <div class="w-full border-b border-light-gray p-6">
        <div class="flex flex-row items-center justify-center gap-3">
            <span
                v-for="category in categories"
                class="text-md uppercase cursor-pointer hover:underline w-24 text-center"
                @click="
                    navigateTo({ name: 'shop-category', params: { category } })
                "
            >
                {{ $t(`category_${category}`) }}
            </span>
        </div>
    </div>
</template>
