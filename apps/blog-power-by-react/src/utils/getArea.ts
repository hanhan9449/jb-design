export function getArea(row: number, column: number) {
    return ~~((row-1) / 3) * 3 + ~~((column-1) / 3) +1
}
