<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const toast = useToast()
const cartStore = useCartStore()

const { items, totalItems, totalPrice } = storeToRefs(cartStore)
const { updateCartItemQuantity, removeFromCart } = cartStore

const visible = ref<boolean>(false)
const previousQuantities = ref<Record<string, number>>({})

const navigateToCart = () => {
    visible.value = false
    navigateTo({ name: 'cart' })
}

const navigateToProduct = (productId: string) => {
    visible.value = false
    navigateTo({
        name: 'product-id',
        params: { id: productId },
    })
}

const debouncedUpdateCartItemQuantity = useDebounce(
    async (productId: string, sku: string, quantity: number) => {
        try {
            await updateCartItemQuantity(productId, sku, quantity)
        } catch (error: any) {
            if (error?.availableStock === 0) {
                toast.add({
                    severity: 'warn',
                    summary: 'Błąd koszyka',
                    detail: 'Produkt został wyprzedany i usunięty!',
                    life: 3000,
                })

                items.value = items.value.filter((item) => item.sku !== sku)
            } else if (error?.availableStock) {
                toast.add({
                    severity: 'error',
                    summary: 'Błąd koszyka',
                    detail: `Dostępna ilość to ${error.availableStock}!`,
                    life: 3000,
                })

                items.value = items.value.map((item) =>
                    item.productId === productId && item.sku === sku
                        ? {
                              ...item,
                              quantity: error.availableStock,
                          }
                        : item
                )
            } else {
                console.error(error.message)
            }
        }
    },
    500
)

const handleUpdateQuantity = (
    productId: string,
    sku: string,
    newQuantity: number
) => {
    const key = `${productId}-${sku}`
    const prevQuantity = previousQuantities.value[key] ?? 0

    if (newQuantity !== prevQuantity) {
        previousQuantities.value[key] = newQuantity
        debouncedUpdateCartItemQuantity(productId, sku, newQuantity)
    }
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
                <div
                    v-for="item in items"
                    :key="item.productId"
                    class="flex flex-col"
                >
                    <div class="flex flex-row gap-5">
                        <img :src="item.image" class="w-24" />
                        <div class="flex flex-col gap-2 w-full">
                            <h1
                                class="uppercase cursor-pointer hover:underline"
                                @click="navigateToProduct(item.productId)"
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
                                    @focus="
                                        previousQuantities[
                                            `${item.productId}-${item.sku}`
                                        ] = item.quantity
                                    "
                                    @update:modelValue="
                                        handleUpdateQuantity(
                                            item.productId,
                                            item.sku,
                                            $event
                                        )
                                    "
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
                                    @click="
                                        removeFromCart(item.productId, item.sku)
                                    "
                                >
                                    {{ $t('cart_remove') }}
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
                    :disabled="totalItems === 0"
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

:deep(.p-inputtext:enabled:focus) {
    border-color: #e0e1e1;
}
</style>
