export interface OrderForm {
    contactEmail: string
    firstName: string
    lastName: string
    address: string
    postalCode: string
    city: string
    phone: string
}

export interface OrderData extends OrderForm {
    cartId: string
    shippingMethod: string
    parcelLocker?: string
    paymentMethod: string
}

export interface OrderDeliveryMethod {
    name: string
    value: string
    price: number
}
