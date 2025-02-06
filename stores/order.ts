import { defineStore } from 'pinia'
import type { OrderData } from '@/types/order'

export const useOrderStore = defineStore('order', () => {
    const { $axios } = useNuxtApp()

    const placeOrder = async (orderData: OrderData) => {
        try {
            const response = await $axios.post('/order', orderData)
            return response.data
        } catch (error) {
            console.error('Błąd składania zamówienia:', error)
            throw new Error('Nie udało się złożyć zamówienia')
        }
    }

    return { placeOrder }
})
