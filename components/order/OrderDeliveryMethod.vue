<script setup lang="ts">
import type { OrderDeliveryMethod } from '@/types/order'

const methods = ref<OrderDeliveryMethod[]>([
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
const selectedMethod = ref<string>(methods.value[0].value)
</script>

<template>
    <div>
        <div
            v-for="method in methods"
            :key="method.value"
            class="w-full lg:w-1/2"
        >
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
                <div>
                    <span>
                        {{ method.price }}
                        {{ $t('currency') }}
                    </span>
                </div>
            </div>
            <Button
                :label="$t('order_select_parcel_locker')"
                class="w-full mt-1"
                severity="secondary"
                v-if="
                    method.value === 'inpost_parcel_lockers' &&
                    selectedMethod === 'inpost_parcel_lockers'
                "
            />
        </div>
    </div>
</template>
