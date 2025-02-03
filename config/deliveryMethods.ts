import type { OrderDeliveryMethod } from '@/types/order'

export const deliveryMethods = [
    {
        name: 'InPost Kurier',
        value: 'inpost_courier',
        price: 14.99,
    },
    {
        name: 'InPost Paczkomaty',
        value: 'inpost_parcel_locker',
        price: 11.99,
    },
] as OrderDeliveryMethod[]
