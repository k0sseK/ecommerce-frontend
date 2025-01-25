<template>
    <div class="container mx-auto max-w-7xl mt-20">
        <div
            class="px-4 md:px-0 lg:px-0 xl:px-0 2xl:px-0 py-4 grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
            <div class="lg:col-span-8 flex flex-col gap-4">
                <div class="border border-light-gray rounded-md p-4">
                    <div class="flex flex-col gap-4">
                        <div>
                            <span class="text-2xl font-medium">Kontakt</span>
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
                            <span class="text-2xl font-medium">Dostawa</span>
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
                            <span class="text-2xl font-medium">Płatność</span>
                            <Divider class="my-0" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-4"></div>
        </div>
    </div>
</template>
