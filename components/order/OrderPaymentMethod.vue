<script setup lang="ts">
const methods = ref([
    {
        name: 'BLIK',
        value: 'blik',
    },
    {
        name: 'Przelew bankowy',
        value: 'bank_transfer',
    },
])
const selectedMethod = ref(methods.value[0].value)
</script>

<template>
    <div>
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
                        <!-- <span>
                            {{ method.price }}
                            {{ $t('currency') }}
                        </span> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
