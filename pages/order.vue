<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import type { OrderDeliveryMethod } from '@/types/order'

const cartStore = useCartStore()

const { items, totalItems, totalPrice } = storeToRefs(cartStore)

const deliveryMethods = ref<OrderDeliveryMethod[]>([
    {
        name: 'InPost Kurier',
        value: 'inpost_courier',
        price: 14.99,
    },
    {
        name: 'InPost Paczkomaty',
        value: 'inpost_parcel_lockers',
        price: 11.99,
    },
])
const selectedDeliveryMethod = ref<string>(deliveryMethods.value[0].value)

const getDeliveryPrice = computed(() => {
    return (
        deliveryMethods.value.find(
            (method) => method.value === selectedDeliveryMethod.value
        )?.price || 0
    )
})

const navigateToProduct = (productId: number) => {
    navigateTo({
        name: 'product-id',
        params: { id: productId },
    })
}
</script>

<template>
    <div class="container mx-auto max-w-7xl mt-20">
        <div
            class="px-4 md:px-0 lg:px-0 xl:px-0 2xl:px-0 py-4 grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
            <div class="lg:col-span-8 flex flex-col gap-4">
                <div class="border border-light-gray rounded-md p-4">
                    <div class="flex flex-col gap-4">
                        <div>
                            <span class="text-2xl font-medium">
                                {{ $t('order_contact') }}
                            </span>
                            <Divider class="my-0" />
                        </div>

                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
                            <div class="lg:col-span-12">
                                <InputText
                                    autocomplete="off"
                                    class="w-full"
                                    :placeholder="$t('order_form_email')"
                                />
                            </div>
                        </div>

                        <div>
                            <span class="text-2xl font-medium">
                                {{ $t('order_delivery') }}
                            </span>
                            <Divider class="my-0" />
                        </div>

                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
                            <div class="lg:col-span-6">
                                <InputText
                                    autocomplete="off"
                                    class="w-full"
                                    :placeholder="$t('order_form_firstname')"
                                />
                            </div>

                            <div class="lg:col-span-6">
                                <InputText
                                    autocomplete="off"
                                    class="w-full"
                                    :placeholder="$t('order_form_lastname')"
                                />
                            </div>

                            <div class="lg:col-span-12">
                                <InputText
                                    autocomplete="off"
                                    class="w-full"
                                    :placeholder="$t('order_form_address')"
                                />
                            </div>

                            <div class="lg:col-span-6">
                                <InputText
                                    autocomplete="off"
                                    class="w-full"
                                    :placeholder="$t('order_form_zipcode')"
                                />
                            </div>

                            <div class="lg:col-span-6">
                                <InputText
                                    autocomplete="off"
                                    class="w-full"
                                    :placeholder="$t('order_form_city')"
                                />
                            </div>

                            <div class="lg:col-span-12">
                                <IconField>
                                    <InputText
                                        autocomplete="off"
                                        class="w-full"
                                        :placeholder="
                                            $t('order_form_phone_number')
                                        "
                                    />
                                    <InputIcon
                                        class="pi pi-info-circle"
                                        v-tooltip.top="{
                                            value: $t(
                                                'order_form_phone_number_tooltip'
                                            ),
                                            pt: {
                                                text: {
                                                    class: 'text-sm text-center',
                                                },
                                            },
                                        }"
                                    />
                                </IconField>
                            </div>
                        </div>

                        <div>
                            <span class="text-2xl font-medium">
                                {{ $t('order_delivery_method') }}
                            </span>
                            <Divider class="my-0" />
                        </div>

                        <div class="col-span-6 lg:col-span-6">
                            <OrderDeliveryMethod />
                        </div>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-4 flex flex-col gap-8">
                <div class="border border-light-gray rounded-md p-4">
                    <div class="flex flex-col gap-4">
                        <div>
                            <span class="text-2xl font-medium">
                                {{ $t('order_shopping_cart') }}
                            </span>
                            <Divider class="my-0" />
                        </div>

                        <div v-if="totalItems > 0" class="flex flex-col gap-4">
                            <div
                                v-for="item in items"
                                :key="item.id"
                                class="flex flex-row gap-4"
                            >
                                <img :src="item.image" class="w-14" />
                                <div class="flex flex-col gap-2 w-full">
                                    <h1
                                        class="uppercase cursor-pointer hover:underline"
                                        @click="navigateToProduct(item.id)"
                                    >
                                        {{ item.name }}
                                    </h1>

                                    <div
                                        class="flex flex-col gap-1 text-xs font-light text-light-gray"
                                    >
                                        <p>
                                            {{
                                                `${$t('cart_size')}: ${
                                                    item.size
                                                }`
                                            }}
                                        </p>
                                        <p>
                                            {{
                                                `${item.price} ${$t(
                                                    'currency'
                                                )} x ${item.quantity}`
                                            }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p class="text-center" v-else>{{ $t('cart_empty') }}</p>

                        <div class="flex flex-col">
                            <div class="flex flex-col gap-1">
                                <div
                                    class="flex flex-row justify-between text-sm"
                                >
                                    <span>{{ $t('order_subtotal') }}</span>
                                    <span>
                                        {{ `${totalPrice} ${$t('currency')}` }}
                                    </span>
                                </div>

                                <div
                                    class="flex flex-row justify-between text-sm"
                                >
                                    <span>{{ $t('order_delivery') }}</span>
                                    <span>
                                        {{
                                            `${getDeliveryPrice} ${$t(
                                                'currency'
                                            )}`
                                        }}
                                    </span>
                                </div>
                            </div>

                            <Divider />
                            <div class="flex flex-row justify-between">
                                <p>
                                    {{ $t('order_total') }}
                                    <span class="text-light-gray text-xs">
                                        {{ $t('order_tax_included') }}
                                    </span>
                                </p>
                                <p>
                                    {{
                                        `${totalPrice + getDeliveryPrice} ${$t(
                                            'currency'
                                        )}`
                                    }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border border-light-gray rounded-md p-4">
                    <div>
                        <span class="text-2xl font-medium">
                            {{ $t('order_payment_method') }}
                        </span>
                        <Divider class="mt-0" />
                    </div>

                    <OrderPaymentMethod />
                    <Button
                        severity="secondary"
                        class="w-full mt-1"
                        :label="$t('order_pay')"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep(.p-radiobutton-checked .p-radiobutton-box) {
    border: 2px solid #e0e1e1;
    background: transparent;
}

:deep(.p-inputtext:enabled:focus) {
    border-color: #e0e1e1;
}
</style>
