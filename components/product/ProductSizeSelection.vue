<script setup lang="ts">
const props = defineProps({
    quantity: {
        type: Array as () => Array<{
            size: string
            stock: number
            sku: string
        }>,
        required: true,
    },
})

const selectedSize = defineModel<string | null>('selectedSize')
const selectedSku = defineModel<string | null>('selectedSku')

const selectSize = (size: string, sku: string) => {
    const selectedItem = props.quantity.find((item) => item.size === size)
    if (selectedItem && selectedItem.stock > 0) {
        selectedSize.value = size
        selectedSku.value = sku
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
            @click="selectSize(item.size, item.sku)"
        />
    </div>
</template>
