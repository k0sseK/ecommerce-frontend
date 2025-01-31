<script setup lang="ts">
const props = defineProps({
    quantity: {
        type: Array as () => Array<{ size: string; stock: number }>,
        required: true,
    },
})

const selectedSize = ref<string | null>(null)

const selectSize = (size: string) => {
    const selectedItem = props.quantity.find((item) => item.size === size)
    if (selectedItem && selectedItem.stock > 0) {
        selectedSize.value = size
    }
}
</script>
<template>
    <div class="flex flex-row items-center gap-2">
        <Button
            v-for="item in quantity"
            :key="item.size"
            :label="item.size"
            :variant="selectedSize === item.size ? undefined : 'outlined'"
            severity="contrast"
            class="w-11 h-11"
            :disabled="item.stock === 0"
            @click="selectSize(item.size)"
        />
    </div>
</template>
