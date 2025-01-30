export const categories = [
    'all',
    'hoodies',
    'tees',
    'pants',
    'accessories',
] as const

export type Category = (typeof categories)[number]
