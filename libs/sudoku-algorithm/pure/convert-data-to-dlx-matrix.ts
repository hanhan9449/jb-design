import dlx from 'dlx'
export function convertDataToDlxMatrix(data: number[][]) {
    let matrix = new Array(729)
    for (let i = 0; i < matrix.length; ++i) {
        matrix[i] = new Array(324).fill(0)
    }
    for (let i = 0; i < data.length; ++i) {
        for (let j = 0; j < data[i].length; ++j) {
            const k = data[i][j]
            if (!k) {
                continue
            }
            const row = i * 9 * 9 + j * 9 + k -1
            const a = i * 9 + j
            const b = i * 9 + k + 9**2 - 1
            const c = j * 9 + k + 9**2 * 2 - 1
            const d = (~~(i / 3**2) + ~~(j / 3)) * 9 + k + 9**2 * 3 - 1
            matrix[row][a] = 1
            matrix[row][b] = 1
            matrix[row][c] = 1
            matrix[row][d] = 1
        }
    }
    console.log(matrix)
    return matrix
}

export function solveDLxMatrix(matrix: number[][]) {}

export function getRoom(r, c) {
    let dx = ~~(r / 2) + 1
    let dy = ~~(c / 2) + 1
    let room = (dx - 1) * 2 + dy
    return room

}
export function convertRowToPos(row) {
    const loc = ~~(row / 4)
    const i = ~~(loc / 4)
    const j = loc % 4
    const k = row % 4 + 1
    return [i,j,k]
}

export function convert2(data: number[][]) {
    // 4 * 4
    // (r,c,w)
    // 4 * 4 * 4 行
    // 列
    // 行不相同 4 * 4
    // 列不相同 4 * 4
    // 宫不相同 4 * 4
    // 行 + 列 确定一个数 4 * 4

    let rows = 4*4*4
    let columns = 4 * 4 * 4
    let matrix = new Array(rows)
    for (let i = 0; i < rows; ++i) {
        matrix[i] = new Array(columns).fill(0)
    }
    function getRow(r, c, k) {
        return r * 4**2 + c * 4 + k - 1
    }
    function insert(r, c, k) {
        const row = getRow(r,c,k)
        const room = getRoom(r,c )

        let a = r * 4 + c
        let b = r * 4 + k + 4 **2 - 1
        let _c = c * 4 + k + 4**2 * 2 - 1
        let d = (room - 1) * 4 + k + 4 ** 2 * 3 - 1
        matrix[row][a] = 1
        matrix[row][b] = 1
        matrix[row][_c] = 1
        matrix[row][d] = 1
    }
    for (let i = 0; i < data.length; ++i) {
        for (let j = 0; j < data.length; ++j) {
            const k = data[i][j]
            if (k) {
                insert(i,j,k)
            } else {
                for (let kk = 1; kk <= 4; ++kk) {
                    insert(i, j, kk)
                }
            }


        }
    }
    return matrix

}