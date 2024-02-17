export function convertNumberPriceToNormalString(price?: number): string {
    if (price === undefined) return  "- ₽"
    return `${price.toLocaleString()} ₽`
}