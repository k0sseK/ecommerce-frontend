<template>
    <div class="absolute top-0 w-full z-20">
        <div
            class="container mx-auto max-w-[1840px] flex flex-row items-center justify-between p-4"
        >
            <div></div>
            <div>
                <h1 class="text-4xl font-medium tracking-wide">
                    {{ $t('shop_name') }}
                </h1>
            </div>
            <div>
                <BasketDrawer />
            </div>
        </div>
    </div>
</template>
