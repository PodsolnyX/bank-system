export function convertNumberPriceToNormalString(price?: number): string {
    if (price === undefined) return  "-"
    return `${(Math.trunc(price / 100)).toLocaleString()},${price % 100 > 9 ? price % 100 : "0" + price % 100}`
}

export function convertDateTimmeStringToNormalString(date?: string): string {
    if (date === undefined || date === null) return " "
    return date.replace("T", " ").slice(0, 19)
}