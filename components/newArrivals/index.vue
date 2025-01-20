<template>
    <div class="flex flex-col gap-8">
        <div class="flex flex-row items-center justify-between">
            <h1 class="text-2xl uppercase">{{ $t('new_arrivals') }}</h1>
            <p class="text-xs uppercase underline cursor-pointer">
                {{ $t('check_all') }}
            </p>
        </div>

        <NewArrivalsCarousel />
    </div>
</template>
