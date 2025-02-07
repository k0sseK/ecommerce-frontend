<script setup lang="ts"></script>

<template>
    <div class="h-screen flex flex-col justify-center items-center">
        <AppHeader />

        <h1 class="text-9xl font-bold">404</h1>
        <p class="text-2xl mb-2">{{ $t('not_found') }}</p>
        <Button
            :label="$t('back_to_home')"
            severity="secondary"
            class="px-10"
            @click="navigateTo('/')"
        />
    </div>
</template>
