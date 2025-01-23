<script setup lang="ts">
const sizes = ref<string[]>(['S', 'M', 'L', 'XL'])
</script>
<template>
    <div class="flex flex-row items-center gap-2">
        <Button
            v-for="size in sizes"
            :label="size"
            severity="contrast"
            variant="outlined"
            class="w-11 h-11"
        />
    </div>
</template>
