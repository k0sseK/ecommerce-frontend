<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'
import { storeToRefs } from 'pinia'
import { loadStripe } from '@stripe/stripe-js'
import { deliveryMethods } from '@/config/deliveryMethods'
import type { OrderForm } from '@/types/order'

const { t } = useI18n()

const toast = useToast()

const cartStore = useCartStore()
const { items, totalItems, totalPrice } = storeToRefs(cartStore)

const orderStore = useOrderStore()
const { placeOrder } = orderStore

const loading = ref<boolean>(false)
const selectedPaymentMethod = ref<string>('stripe')

const selectedDeliveryMethod = ref<string>(deliveryMethods[0].value)
const getDeliveryPrice = computed(() => {
    return (
        deliveryMethods.find(
            (method) => method.value === selectedDeliveryMethod.value
        )?.price || 0
    )
})

const initialValues = reactive<OrderForm>({
    contactEmail: '',
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    phone: '',
})

const navigateToProduct = (productId: string) => {
    navigateTo({
        name: 'product-id',
        params: { id: productId },
    })
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const resolver = ({ values }: { values: OrderForm }) => {
    const errors: { [key: string]: { type: string; message?: string }[] } = {}

    for (const key in initialValues) {
        const value = values[key as keyof OrderForm]

        if (!value) {
            errors[key] = [{ type: 'required' }]
        } else if (
            key === 'contactEmail' &&
            !emailRegex.test(value as string)
        ) {
            errors[key] = [
                { type: 'required', message: t('order_form_email_invalid') },
            ]
        }
    }

    return {
        errors,
    }
}

const onFormSubmit = async ({ valid }: { valid: boolean }) => {
    console.log(window.location.origin)
    if (valid) {
        loading.value = true

        try {
            const orderData = {
                ...initialValues,
                cartId: getCartId(),

                shippingMethod: selectedDeliveryMethod.value,
                shippingPrice: getDeliveryPrice.value,
                paymentMethod: 'stripe',

                successUrl: `${window.location.origin}/order/success`,
                cancelUrl: `${window.location.origin}/shop/all`,
            }

            const { sessionId } = await placeOrder(orderData)

            const stripe = await loadStripe(
                'pk_test_51QoRVjAc9oXjMlaqKN7xEDxENYnNCaukIOKBxVkpJvLYSjEWVeXhR0COtNVBWO738REfRtmYqEiWhWgaXfa9NXcI00zsDq1Oy2'
            )

            const result = await stripe?.redirectToCheckout({ sessionId })
            if (result?.error) {
                console.error('Błąd płatności:', result.error.message)
                alert('Wystąpił błąd podczas płatności.')
            }
        } catch (error) {
            console.error('Błąd zamówienia:', error)
            toast.add({
                severity: 'error',
                summary: t('order'),
                detail: t('order_failed'),
                life: 3000,
            })
        } finally {
            loading.value = false
        }
    } else {
        toast.add({
            severity: 'error',
            summary: t('order'),
            detail: t('order_fill_required_fields'),
            life: 3000,
        })
    }
}
</script>

<template>
    <div class="container mx-auto max-w-7xl mt-20">
        <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit">
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
                                        v-model="initialValues.contactEmail"
                                        name="contactEmail"
                                        autocomplete="off"
                                        class="w-full"
                                        :placeholder="$t('order_form_email')"
                                        :formControl="{
                                            validateOnValueUpdate: true,
                                        }"
                                    />
                                    <Message
                                        v-if="$form.contactEmail?.invalid"
                                        severity="error"
                                        size="small"
                                        variant="simple"
                                        >{{
                                            $form.contactEmail.error?.message
                                        }}</Message
                                    >
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
                                        v-model="initialValues.firstName"
                                        autocomplete="off"
                                        class="w-full"
                                        :placeholder="
                                            $t('order_form_firstname')
                                        "
                                        name="firstName"
                                    />
                                </div>

                                <div class="lg:col-span-6">
                                    <InputText
                                        v-model="initialValues.lastName"
                                        autocomplete="off"
                                        class="w-full"
                                        :placeholder="$t('order_form_lastname')"
                                        name="lastName"
                                    />
                                </div>

                                <div class="lg:col-span-12">
                                    <InputText
                                        v-model="initialValues.address"
                                        autocomplete="off"
                                        class="w-full"
                                        :placeholder="$t('order_form_address')"
                                        name="address"
                                    />
                                </div>

                                <div class="lg:col-span-6">
                                    <InputText
                                        v-model="initialValues.postalCode"
                                        autocomplete="off"
                                        class="w-full"
                                        :placeholder="$t('order_form_zipcode')"
                                        name="postalCode"
                                    />
                                </div>

                                <div class="lg:col-span-6">
                                    <InputText
                                        v-model="initialValues.city"
                                        autocomplete="off"
                                        class="w-full"
                                        :placeholder="$t('order_form_city')"
                                        name="city"
                                    />
                                </div>

                                <div class="lg:col-span-12">
                                    <IconField>
                                        <InputText
                                            v-model="initialValues.phone"
                                            autocomplete="off"
                                            class="w-full"
                                            :placeholder="
                                                $t('order_form_phone_number')
                                            "
                                            name="phone"
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

                            <OrderDeliveryMethod
                                :selectedDeliveryMethod="selectedDeliveryMethod"
                            />
                            <OrderPaymentMethod
                                :selectedPaymentMethod="selectedPaymentMethod"
                            />
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

                            <div
                                v-if="totalItems > 0"
                                class="flex flex-col gap-4"
                            >
                                <div
                                    v-for="item in items"
                                    :key="item.productId"
                                    class="flex flex-row gap-4"
                                >
                                    <img :src="item.image" class="w-14" />
                                    <div class="flex flex-col gap-2 w-full">
                                        <h1
                                            class="uppercase cursor-pointer hover:underline"
                                            @click="
                                                navigateToProduct(
                                                    item.productId
                                                )
                                            "
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
                            <p class="text-center" v-else>
                                {{ $t('cart_empty') }}
                            </p>

                            <div class="flex flex-col">
                                <div class="flex flex-col gap-1">
                                    <div
                                        class="flex flex-row justify-between text-sm"
                                    >
                                        <span>{{ $t('order_subtotal') }}</span>
                                        <span>
                                            {{
                                                `${totalPrice.toFixed(2)} ${$t(
                                                    'currency'
                                                )}`
                                            }}
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
                                            `${(
                                                totalPrice + getDeliveryPrice
                                            ).toFixed(2)} ${$t('currency')}`
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            severity="secondary"
                            class="w-full mt-5"
                            :label="$t('order_place_order')"
                            :loading="loading"
                        />
                    </div>
                </div>
            </div>
        </Form>
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
