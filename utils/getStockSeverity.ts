export default function (status: string) {
    if (status === 'out_of_stock') {
        return 'secondary'
    }

    return undefined
}
