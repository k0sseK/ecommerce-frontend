<script setup lang="ts">
const categories = ref(['hoodies', 'tees'])
</script>

<template>
    <div class="w-full border-y border-gray-400 p-6">
        <div class="flex flex-row items-center justify-center gap-7">
            <span
                v-for="category in categories"
                class="text-md uppercase cursor-pointer hover:underline"
            >
                {{ $t(category) }}
            </span>
        </div>
    </div>
</template>
