import { defineStore } from 'pinia'
import type { CartItem } from '~/types/cart'

export const useCartStore = defineStore('cart', () => {
    const { $axios } = useNuxtApp()

    const cartId = ref<string | null>(null)
    const items = ref<CartItem[]>([])

    const totalItems = computed(() => items.value.length)
    const totalPrice = computed(() =>
        parseFloat(
            items.value
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)
        )
    )

    const fetchCart = async () => {
        if (!cartId.value) return

        try {
            const response = await $axios.get(`/cart/${cartId.value}`)
            items.value = response.data.items || []
        } catch (error) {
            console.error('Błąd pobierania koszyka:', error)
        }
    }

    const addToCart = async (item: CartItem) => {
        try {
            const response = await $axios.post(`/cart/${cartId.value}`, item)
            items.value = response.data.items
        } catch (error) {
            console.error('Błąd dodawania do koszyka:', error)
        }
    }

    const updateCartItemQuantity = async (
        itemId: string,
        sku: string,
        quantity: number
    ) => {
        try {
            const response = await $axios.put(
                `/cart/${cartId.value}/${itemId}/${sku}`,
                { quantity }
            )
            items.value = response.data.items

            return true
        } catch (error: any) {
            console.error('Błąd aktualizacji ilości w koszyku:', error)

            if (error.response?.status === 404) {
                throw error.response.data
            }

            throw new Error('Nie udało się zaktualizować ilości')
        }
    }

    const removeFromCart = async (itemId: string, sku: string) => {
        try {
            const response = await $axios.delete(
                `/cart/${cartId.value}/${itemId}/${sku}`
            )
            items.value = response.data.items
        } catch (error) {
            console.error('Błąd usuwania z koszyka:', error)
        }
    }

    const clearCart = async (itemId: string, sku: string) => {
        try {
            await $axios.delete(`/cart/${cartId.value}`)
            items.value = []
        } catch (error) {
            console.error('Błąd czyszczenia koszyka:', error)
        }
    }

    onMounted(() => {
        cartId.value = getCartId()
        fetchCart()
    })

    return {
        cartId,
        items,
        totalItems,
        totalPrice,
        fetchCart,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
    }
})
