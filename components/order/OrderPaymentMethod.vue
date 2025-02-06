<script setup lang="ts">
const methods = ref([
    {
        name: 'Stripe (BLIK, Karta, Przelewy24)',
        value: 'stripe',
    },
])
const selectedMethod = defineModel<string>('selectedPaymentMethod')
</script>

<template>
    <div>
        <div>
            <span class="text-2xl font-medium">
                {{ $t('order_payment_method') }}
            </span>
            <Divider class="mt-0" />
        </div>

        <div v-for="method in methods" :key="method.value" class="w-full">
            <div class="flex flex-row items-center justify-between">
                <div class="flex flex-row items-center gap-2">
                    <RadioButton
                        v-model="selectedMethod"
                        :inputId="method.value"
                        :value="method.value"
                        name="dynamic"
                        size="small"
                    />
                    <label :for="method.value" class="cursor-pointer">
                        {{ method.name }}
                    </label>
                </div>
                <div class="flex flex-row items-center">
                    <img
                        src="/assets/img/blik.png"
                        alt="payment_method_blik"
                        class="rounded-sm"
                    />
                    <img
                        src="/assets/img/mastercard.png"
                        alt="payment_method_card_mastercard"
                        class="rounded-sm"
                    />
                    <img
                        src="/assets/img/visa.png"
                        alt="payment_method_card_visa"
                        class="rounded-sm"
                    />
                    <img
                        src="/assets/img/p24.png"
                        alt="payment_method_p24"
                        class="rounded-sm ml-2"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
