<script setup lang="ts">
defineProps<{
    images: string[]
    selectedImage: number
}>()

const emit = defineEmits(['update:selected-image'])

const selectImage = (index: number) => {
    emit('update:selected-image', index)
}
</script>

<template>
    <div class="mt-10 ml-10 w-24">
        <div class="flex flex-col items-center gap-3">
            <div
                v-for="(image, index) in images"
                :key="index"
                class="cursor-pointer p-2 transition-all"
                :class="{
                    'border border-stone-950': index === selectedImage,
                    'blur-sm opacity-90': index !== selectedImage,
                }"
                @click="selectImage(index)"
            >
                <img :src="image" class="w-full" />
            </div>
        </div>
    </div>
</template>
