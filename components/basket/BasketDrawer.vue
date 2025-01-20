<script setup lang="ts">
const visible = ref<boolean>(false)
</script>

<template>
    <div>
        <i
            class="pi pi-shopping-bag text-lg cursor-pointer"
            @click="visible = true"
        ></i>

        <Drawer
            v-model:visible="visible"
            :header="$t('basket')"
            position="right"
            class="w-96"
        >
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </p>
        </Drawer>
    </div>
</template>
