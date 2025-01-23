import { defineStore } from 'pinia'
import type { CartItem } from '~/types/cart'

export const useCartStore = defineStore('cart', () => {
    const items = ref<CartItem[]>([
        {
            id: 1,
            name: 'Bamboo Watch',
            size: 'M',
            image: 'https://i.imgur.com/5lX95H5.png',
            price: 199.99,
            quantity: 5,
        },
        {
            id: 2,
            name: 'Bamboo Watch',
            size: 'S',
            image: 'https://i.imgur.com/5lX95H5.png',
            price: 99.99,
            quantity: 2,
        },
    ])

    const totalItems = computed(() => items.value.length)

    const totalPrice = computed(() => {
        if (items.value.length === 0) {
            return 0
        }

        return items.value.reduce((total, item) => {
            return total + item.price * item.quantity
        }, 0)
    })

    const addToCart = (item: CartItem) => {
        const existingItem = items.value.find((i) => i.id === item.id)
        if (existingItem) {
            existingItem.quantity += item.quantity
        } else {
            items.value.push(item)
        }
    }

    const removeFromCart = (itemId: number) => {
        items.value = items.value.filter((item) => item.id !== itemId)
    }

    return { items, totalItems, totalPrice, addToCart, removeFromCart }
})
