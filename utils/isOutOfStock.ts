export default function (
    quantity: { size: string; stock: number; sku: string }[]
): boolean {
    const isOutOfStock = quantity.every((item) => item.stock === 0)
    return isOutOfStock
}
