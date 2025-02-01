import { defineStore } from 'pinia'
import type { Category } from '@/types/category'

export const useProductStore = defineStore('product', () => {
    const { $axios } = useNuxtApp()

    const products = ref<any[]>([])
    const lastProducts = ref<any[]>([])

    const fetchProducts = async (category: Category = 'all') => {
        try {
            const response = await $axios.get(
                category === 'all'
                    ? '/products'
                    : `/products/category/${category.toUpperCase()}`
            )
            products.value = response.data
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    const fetchLastProducts = async (limit: number = 12) => {
        try {
            const response = await $axios.get('/products/last', {
                params: { limit },
            })
            lastProducts.value = response.data
        } catch (error) {
            console.error('Error fetching last products:', error)
        }
    }

    const fetchProductById = async (productId: string) => {
        try {
            const response = await $axios.get(`/products/${productId}`)
            return response.data
        } catch (error) {
            console.error('Error fetching product by id:', error)
        }
    }

    const addProduct = async (productData: any) => {
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
        fetchProductById,
        addProduct,
    }
})
