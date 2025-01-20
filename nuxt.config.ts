// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: false },
    ssr: true,
    modules: ['@pinia/nuxt', '@primevue/nuxt-module', '@nuxtjs/i18n'],
    css: ['~/assets/css/tailwind.css', '~/assets/scss/main.scss'],

    primevue: {
        options: {
            theme: {
                preset: Aura,
                options: {
                    cssLayer: {
                        name: 'primevue',
                        order: 'tailwind-base, primevue, tailwind-utilities',
                    },
                },
            },
        },
    },

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    i18n: {
        vueI18n: '~/i18n.config.ts',
        defaultLocale: 'pl',
    },
})
