<script setup lang="ts">
const { t, locale } = useI18n()
const toast = useToast()

const menu = ref()
const items = ref([
    {
        label: t('language_selector'),
        items: [
            {
                label: t('language_pl'),
                command: () => changeLanguage('pl'),
            },
            {
                label: t('language_en'),
                command: () => changeLanguage('en'),
            },
        ],
    },
])

const toggle = (event: Event) => {
    menu.value.toggle(event)
}

const changeLanguage = (lang: string) => {
    locale.value = lang

    toast.add({
        severity: 'secondary',
        summary: t('language_success_summary'),
        detail: t('language_success_detail', { lang: t(`language_${lang}`) }),
        life: 2000,
    })
}
</script>

<template>
    <div>
        <span class="cursor-pointer uppercase" @click="toggle">
            {{ locale }}
        </span>
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </div>
</template>
