

export function mergeClasses(...ss: (string | false)[]);
export function mergeClasses() {
    let result = ''
    const n = arguments.length
    let needSpace = false
    for (let i = 0; i < n; i++) {
        // eslint-disable-next-line prefer-rest-params
        if (arguments[i]) {
            if (needSpace) {
                result += ' '
                needSpace = false
            }
            // eslint-disable-next-line prefer-rest-params
            result += arguments[i]
            needSpace = true
        }
    }
    return result
}