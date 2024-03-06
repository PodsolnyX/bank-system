export function convertNumberPriceToNormalString(price?: number): string {
    if (price === undefined) return  ""
    return `${price.toLocaleString()}`
}

export function convertDateTimmeStringToNormalString(date?: string): string {
    if (date === undefined) return " "
    return date.replace("T", " ").slice(0, 19)
}