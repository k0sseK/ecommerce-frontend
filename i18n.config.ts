import pl from '@/locales/pl.json'
import en from '@/locales/en.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locales: ['pl', 'en'],
    defaultLocale: 'pl',
    messages: {
        pl: pl,
        en: en,
    },
}))
