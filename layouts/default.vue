<template>
    <div class="flex flex-col min-h-screen">
        <Toast />

        <AppHeader />
        <main class="flex-grow">
            <slot />
        </main>
        <AppFooter v-if="$route.name !== 'order-success'" />
    </div>
</template>
