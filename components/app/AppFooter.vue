<template>
    <footer class="bg-zinc-800">
        <div
            class="container mx-auto max-w-[1840px] py-8 flex flex-row items-center justify-center gap-10"
        >
            <div class="flex flex-row items-center gap-2">
                <span class="text-xl">MG</span>
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
            <div class="flex flex-row items-center gap-2">
                <span class="text-sm cursor-pointer hover:underline">
                    {{ $t('terms_and_conditions') }}
                </span>

                <span class="text-sm cursor-pointer hover:underline">
                    {{ $t('privacy_policy') }}
                </span>
            </div>
        </div>
    </footer>
</template>
