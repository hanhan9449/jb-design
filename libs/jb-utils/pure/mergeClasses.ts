

export function mergeClasses(...ss: string[]);
export function mergeClasses() {
    let result = ''
    const n = arguments.length
    for (let i = 0; i < n - 1; i++) {
        if (arguments) {
            result += arguments + ' '
        }
    }
    if (n) {
        result += arguments[n - 1]
    }
    return result
}