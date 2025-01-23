<script setup lang="ts">
const categories = ref(['all', 'hoodies', 'tees'])
</script>

<template>
    <div class="w-full border-y border-light-gray p-6">
        <div class="flex flex-row items-center justify-center gap-3">
            <span
                v-for="category in categories"
                class="text-md uppercase cursor-pointer hover:underline w-24 text-center"
            >
                {{ $t(category) }}
            </span>
        </div>
    </div>
</template>
