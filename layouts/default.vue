<template>
    <div class="flex flex-col min-h-screen">
        <Toast />

        <AppHeader />
        <main class="flex-grow">
            <slot />
        </main>
        <AppFooter />
    </div>
</template>
