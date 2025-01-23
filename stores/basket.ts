import { defineStore } from 'pinia'

export const useBasketStore = defineStore('basket', () => {
    const items = ref([])

    const addToBasket = () => {}

    return { items, addToBasket }
})
