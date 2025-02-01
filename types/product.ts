export interface Product {
    _id: string
    name: string
    description?: string
    category: string
    images: string[]
    price: number
    quantity: { size: string; stock: number; sku: string }[]
}
