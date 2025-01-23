<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()

const { items, totalItems, totalPrice } = storeToRefs(cartStore)
const { removeFromCart } = cartStore

const visible = ref<boolean>(false)

const navigateToCart = () => {
    visible.value = false
    navigateTo('cart')
}
</script>

<template>
    <div>
        <div class="cursor-pointer" @click="visible = true">
            <OverlayBadge
                :value="totalItems"
                size="small"
                severity="contrast"
                v-if="totalItems > 0"
            >
                <i class="pi pi-shopping-bag text-lg"></i>
            </OverlayBadge>
            <i class="pi pi-shopping-bag text-lg" v-else></i>
        </div>

        <Drawer
            v-model:visible="visible"
            :header="$t('cart')"
            position="right"
            class="w-96"
        >
            <div v-if="totalItems > 0" class="flex flex-col">
                <div v-for="item in items" :key="item.id" class="flex flex-col">
                    <div class="flex flex-row gap-5">
                        <img :src="item.image" class="w-24" />
                        <div class="flex flex-col gap-2 w-full">
                            <h1
                                class="uppercase cursor-pointer hover:underline"
                            >
                                {{ item.name }}
                            </h1>

                            <div
                                class="flex flex-col gap-1 text-xs font-light text-light-gray"
                            >
                                <p>{{ `${$t('cart_size')}: ${item.size}` }}</p>
                                <p>
                                    {{
                                        `${item.price} ${$t('currency')} x ${
                                            item.quantity
                                        }`
                                    }}
                                </p>
                            </div>

                            <div
                                class="mt-auto flex flex-row items-center justify-between"
                            >
                                <InputNumber
                                    v-model="item.quantity"
                                    showButtons
                                    buttonLayout="horizontal"
                                    :min="1"
                                    :max="99"
                                    size="small"
                                >
                                    <template #incrementbuttonicon>
                                        <span class="pi pi-plus" />
                                    </template>
                                    <template #decrementbuttonicon>
                                        <span class="pi pi-minus" />
                                    </template>
                                </InputNumber>

                                <span
                                    class="text-xs items-end cursor-pointer hover:underline"
                                    @click="removeFromCart(item.id)"
                                >
                                    Usuń
                                </span>
                            </div>
                        </div>
                    </div>

                    <Divider />
                </div>
            </div>
            <p v-else class="text-center">{{ $t('cart_empty') }}</p>

            <template #footer>
                <Button
                    :label="`${$t('cart_check_out')} ${totalPrice} ${$t(
                        'currency'
                    )}`"
                    severity="secondary"
                    class="w-full py-3"
                    @click="navigateToCart"
                ></Button>
            </template>
        </Drawer>
    </div>
</template>

<style scoped>
:deep(.p-badge) {
    outline: none;
}

:deep(.p-inputnumber-input) {
    text-align: center;
    width: 2.75rem;
}
</style>
