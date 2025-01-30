import { defineStore } from 'pinia'
import type { Category } from '@/types/category'

export const useProductStore = defineStore('product', () => {
    const products = ref<any[]>([])
    const lastProducts = ref<any[]>([])

    const fetchProducts = async (category: Category = 'all') => {
        const { $axios } = useNuxtApp()
        try {
            const response = await $axios.get(
                category === 'all' ? '/products' : '/products/category',
                {
                    params: { category: category.toUpperCase() },
                }
            )
            products.value = response.data
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    const fetchLastProducts = async (limit: number = 12) => {
        const { $axios } = useNuxtApp()
        try {
            const response = await $axios.get('/products/last', {
                params: { limit },
            })
            lastProducts.value = response.data
        } catch (error) {
            console.error('Error fetching last products:', error)
        }
    }

    const addProduct = async (productData: any) => {
        const { $axios } = useNuxtApp()
        try {
            await $axios.post('/products', productData)
        } catch (error) {
            console.error('Error adding product:', error)
        }
    }

    return {
        products,
        lastProducts,
        fetchProducts,
        fetchLastProducts,
        addProduct,
    }
})
