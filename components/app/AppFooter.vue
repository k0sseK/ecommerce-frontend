<template>
    <footer class="bg-zinc-800">
        <div
            class="container mx-auto max-w-[1840px] flex flex-row items-center justify-center py-7"
        >
            <div class="flex flex-row items-center">
                <div
                    class="flex flex-row items-center justify-center gap-2 w-96"
                >
                    <span class="text-xl">{{ $t('shop_name') }}</span>
                    <i
                        class="pi pi-instagram text-xl cursor-pointer"
                        @click="
                            navigateTo('https://www.instagram.com/', {
                                open: {
                                    target: '_blank',
                                },
                            })
                        "
                    ></i>
                </div>

                <div
                    class="flex flex-row items-center justify-center gap-2 w-96"
                >
                    <span class="text-sm cursor-pointer hover:underline">
                        {{ $t('terms_and_conditions') }}
                    </span>

                    <span class="text-sm cursor-pointer hover:underline">
                        {{ $t('privacy_policy') }}
                    </span>
                </div>

                <div
                    class="flex flex-row items-center justify-center gap-2 w-96"
                >
                    <span class="text-sm">
                        {{ $t('shop_name') }} ©
                        {{ $t('all_rights_reserved') }}
                    </span>
                </div>
            </div>
        </div>
    </footer>
</template>
