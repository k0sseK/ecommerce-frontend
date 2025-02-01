<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const toast = useToast()
const cartStore = useCartStore()

const { items, totalItems, totalPrice } = storeToRefs(cartStore)
const { updateCartItemQuantity, removeFromCart } = cartStore

const couponCode = ref<string | null>(null)
const previousQuantities = ref<Record<string, number>>({})

const navigateToProduct = (productId: string) => {
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
    <div class="container mx-auto max-w-7xl mt-20">
        <div
            class="px-4 md:px-0 lg:px-0 xl:px-0 2xl:px-0 py-4 grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
            <div class="lg:col-span-8 flex flex-col gap-4">
                <div class="border border-light-gray rounded-md p-4">
                    <div v-if="totalItems > 0" class="flex flex-col gap-4">
                        <div
                            v-for="item in items"
                            :key="item.productId"
                            class="flex flex-row gap-4"
                        >
                            <img :src="item.image" class="w-28" />
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
                                    <p>
                                        {{ `${$t('cart_size')}: ${item.size}` }}
                                    </p>
                                    <p>
                                        {{
                                            `${item.price} ${$t(
                                                'currency'
                                            )} x ${item.quantity}`
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
                                            removeFromCart(
                                                item.productId,
                                                item.sku
                                            )
                                        "
                                    >
                                        {{ $t('cart_remove') }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="text-center" v-else>{{ $t('cart_empty') }}</p>
                </div>
                <div
                    class="flex flex-row items-center justify-between gap-4 md:gap-0"
                >
                    <div class="w-1/2 md:w-auto">
                        <Button
                            :label="$t('cart_continue_shopping')"
                            severity="secondary"
                            @click="navigateTo('/')"
                        />
                    </div>

                    <div class="w-1/2 md:w-auto">
                        <InputGroup>
                            <InputGroupAddon>
                                <i class="pi pi-percentage"></i>
                            </InputGroupAddon>
                            <InputText
                                v-model="couponCode"
                                :placeholder="$t('cart_coupon_code')"
                            />
                        </InputGroup>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-4">
                <div class="border border-light-gray rounded-md p-4">
                    <h1 class="text-lg">{{ $t('cart_summary') }}</h1>
                    <Divider />

                    <div class="flex flex-row justify-between">
                        <p class="text-sm">
                            {{ $t('cart_total') }}
                            <span class="text-light-gray text-xs">
                                {{ $t('cart_tax_included') }}
                            </span>
                        </p>
                        <p>{{ `${totalPrice} ${$t('currency')}` }}</p>
                    </div>

                    <Button
                        :label="$t('cart_order')"
                        class="w-full mt-4"
                        severity="secondary"
                        :disabled="totalItems === 0"
                        @click="navigateTo('order')"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep(.p-inputnumber-input) {
    text-align: center;
    width: 2.75rem;
}

:deep(.p-inputtext:enabled:focus) {
    border-color: #e0e1e1;
}
</style>
