<template>
    <div class="flex flex-col gap-8">
        <div class="relative h-screen w-full">
            <video
                class="absolute top-0 left-0 h-full w-full object-cover"
                autoplay
                muted
                loop
            >
                <source src="/assets/mp4/cinematic.mp4" type="video/mp4" />
            </video>

            <div class="absolute inset-0 flex items-center justify-center">
                <Button
                    :label="$t('shop')"
                    variant="outlined"
                    severity="secondary"
                    size="large"
                    class="px-10"
                    as="router-link"
                    to="/shop"
                />
            </div>
        </div>

        <div
            class="container mx-auto max-w-[1840px] px-4 md:px-0 lg:px-0 xl:px-0 2xl:px-0"
        >
            <NewArrivals />
        </div>

        <div>
            <img
                src="/assets/png/bg.png"
                class="object-cover w-full h-[52rem]"
            />
        </div>
    </div>
</template>

<style scoped></style>
