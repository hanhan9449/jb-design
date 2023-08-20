import dlx from 'dlx'
import {randomInt} from "crypto";
export class SudokuData {
    data
    dlxMatrix
    constructor(
        private rowGroupSize: number,
        private colGroupSize: number,
        private rowGroupCount: number,
        private colGroupCount: number,
        private numberCount: number
                ) {
        this._initDataArray()
    }
    private _initDataArray() {
        this.data = new Array(this.rowGroupCount * this.rowGroupSize)
        for (let i = 0; i < this.data.length; ++i) {
            this.data[i] = new Array(this.colGroupCount * this.colGroupSize).fill(0)
        }

    }
    getItem(r: number, c: number) {
        return this.data[r][c]
    }
    consoleData() {
        for (let i = 0; i < this.data.length; ++i) {
            console.log(this.data[i].join('\t'))
        }
    }
    setItem(r: number, c: number, value: number) {
        this.data[r][c] = value
    }
    hasItem(r: number, c: number): boolean {
        return this.data[r][c] !== 0
    }
    generate(initSize?: number) {
        this._initDataArray()
        this._initGenerate(initSize ||11)
        this.consoleData()
        const solved = this.solve(this.data)

    }
    private _initGenerate(len: number) {
        const s = new Set<number>()
        const ss = new Map()
        let count = 0
        while (count < len) {
            const i = randomInt(0,this.rowGroupCount * this.rowGroupSize)
            const j = randomInt(0,this.colGroupSize * this.colGroupCount)
            const k = randomInt(1,this.numberCount + 1)
            this.insert(i,j,k)
            ++count
        }

    }
    validate(): boolean {
        return true
    }
    getRoom(i, j) {
        let dr = ~~(i / this.rowGroupCount) + 1
        let dc = ~~(j / this.colGroupCount) + 1
        let room = (dr - 1) * 2 + dc
        return room

    }
    private convertItemToMatrixRow(i, j, k) {
        return i * (this.colGroupCount * this.colGroupSize)**2 + j * this.colGroupCount * this.colGroupSize + k - 1
    }
    private getMatrixSize() {

        let aSize = this.rowGroupSize * this.rowGroupCount * this.colGroupCount * this.colGroupSize
        let bSize = this.rowGroupSize * this.rowGroupCount * this.numberCount
        let cSize = this.colGroupSize * this.colGroupCount * this.numberCount
        let dSize = this.colGroupSize * this.rowGroupSize * this.numberCount
        let size = aSize + bSize + cSize + dSize
        return {
            aSize,
            bSize,
            cSize,
            dSize,
            size
        }
    }
    private convertItemToMatrixCol(i, j, k) {
        const room = this.getRoom(i, j)
        const {aSize,bSize,cSize, dSize} = this.getMatrixSize()
        // board中填入了数字
        let a = i * this.colGroupSize * this.colGroupCount + j
        // 竖行中数字不相同
        let b = i * this.rowGroupCount * this.rowGroupSize + k - 1 + aSize
        // 横行中数字不相同
        let c = j * this.colGroupSize * this.colGroupCount + k - 1 + aSize + bSize
        // 宫块中数字不相同
        let d = (room - 1) * this.colGroupSize * this.rowGroupSize + k - 1 + aSize + bSize + cSize
        return [a,b,c,d]

    }
    canInsert(i,j,k) {
    }
    private insert(i, j, k) {
        if (!this.dlxMatrix) {
            const size = this.getMatrixSize()
            this.dlxMatrix = new Array(this.rowGroupSize * this.rowGroupCount * this.colGroupCount * this.colGroupSize * this.numberCount).fill(0)
            for (let w = 0; w < this.dlxMatrix.length; ++w) {
                this.dlxMatrix[w] = new Array(size.size).fill(0)
            }
        }
        const [a,b,c,d] = this.convertItemToMatrixCol(i,j,k)
        const rowId = this.convertItemToMatrixRow(i,j,k)
        this.dlxMatrix[rowId][a] = 1
        this.dlxMatrix[rowId][b] = 1
        this.dlxMatrix[rowId][c] = 1
        this.dlxMatrix[rowId][d] = 1
        this.data[i][j] = k
    }
    private convertMatrixRowIdToItem(rowId) {
        const loc = ~~(rowId / this.colGroupSize /this.colGroupCount)
        const i = ~~(loc / this.colGroupCount / this.colGroupSize)
        const j = loc % (this.colGroupCount * this.colGroupSize)
        const k = rowId % ( this.colGroupCount * this.colGroupSize) + 1
        return {i,j,k}
    }
    solve(data) {
        for (let i = 0; i < data.length; ++i) {
            for (let j = 0; j < data[i].length; ++j) {
                const k = data[i][j]
                if (k) {
                    this.insert(i,j,k)
                } else {
                    for (let kk = 1; kk <= this.numberCount; ++kk) {
                        this.insert(i,j,kk)
                    }
                }
            }
        }
        const solutions = dlx.solve(this.dlxMatrix)
        console.log('solutions', solutions)
        const ans = new Array(this.rowGroupSize * this.rowGroupCount).fill(0)
        for (let i = 0; i < ans.length; ++i) {
            ans[i] = new Array(this.colGroupSize * this.colGroupCount).fill(0)
        }

        if (!solutions[0]) {
            return []
        }
        for (let _i = 0; _i < solutions[0].length; ++_i) {
            const {i,j,k} = this.convertMatrixRowIdToItem(solutions[0][_i])
            ans[i][j] = k
        }
        console.log('ans',ans)
        return ans

    }
}

export class SudokuData2 {
    data: number[][]
    constructor(
    ) {
        this.data = this._initDataArray(9,9)
    }
    _initDataArray(r, c) {
        const result = new Array(r)
        for (let i = 0; i < result.length; ++i) {
             result[i] = new Array(c).fill(0)
        }
        return result
    }
    _getMatrixSize() {
        let aSize = 81
        let bSize = 81
        let cSize = 81
        let dSize = 81
        let matrixColSize = aSize + bSize + cSize + dSize
        let rowSize = 9
        let colSize = 9
        const matrixRowSize = rowSize * colSize * 9
        return {
            aSize,
            bSize,
            cSize,
            dSize,
            matrixColSize,
            matrixRowSize,
            rowSize,
            colSize
        }

    }
    _initMatrixArray() {
        const {matrixRowSize, matrixColSize} = this._getMatrixSize()
        console.log('matrixRowSize', matrixRowSize, 'matrixColSize', matrixColSize)
        return this._initDataArray(matrixRowSize, matrixColSize)
    }
    getId(row,col,num) {
        return (row - 1) * 9 * 9 + (col - 1) * 9 + num;
    }
    insert(matrix, row, col, num) {
        row += 1
        col +=1
        const dx = Math.floor((row - 1)/3) + 1
        const dy = Math.floor((col - 1)/3) + 1
        const room = (dx - 1) * 3 + dy
        const id = this.getId(row,col,num)
        const f1 = (row - 1) * 9 + num
        const f2 = 81 + (col - 1) * 9 + num
        const f3 = 81 * 2 + (room - 1) * 9 + num
        const f4 = 81 * 3 + (row - 1) * 9 + col
        matrix[id][f1] = 1
        matrix[id][f2] = 1
        matrix[id][f3] = 1
        matrix[id][f4] = 1
    }
    convertDataToMatrix(data) {
        const matrix = this._initMatrixArray()
        const insert = (i,j,k) => {
            const a = i * 9 + j
            const b = i * 9 + k + 80
            const c = j * 9 + k + 161
            const d = (Math.floor(i/3) *3+Math.floor(j/3)) *9 + k + 242
            const rowId = (i *9 +j) *9 + k -1
            matrix[rowId][a] = 1
            matrix[rowId][b] = 1
            matrix[rowId][c] = 1
            matrix[rowId][d] = 1
        }
        for (let i = 0; i < 9; ++i) {
            for (let j = 0; j < 9; ++j) {
                const k = data[i][j]
                if (k) {
                    insert(i,j,k)
                } else {
                    for (let kk = 1; kk <= 9; ++kk) {
                        insert(i,j,kk)
                    }
                }
            }
        }
        console.log('matrix')
        this.consoleData(matrix)
        return matrix
    }
    convertMatrixToData() {}
    generate() {
        this.data = this._initSudoku()

        return this.data
    }
    _initSudoku() {
        const result = this._initDataArray(9,9)
        this._initSudoku1(result)
        this._initSudoku2(result)

        return result
    }
    consoleData(data) {
        console.log('consoleData')
        for (let i = 0; i < data.length; ++i) {
            console.log(data[i].join('\t'))
        }
    }
    _initSudoku1(data) {
        const s = new Set()
        let count = 0
        while(count <11) {
            const i = randomInt(0,8)
            const j = randomInt(0,8)
            const k = randomInt(1,9)
            const a = i * 9 + j
            const b = i * 9 + k + 80
            const c = j * 9 + k + 161
            const d = (Math.floor(i /3) * 3 + Math.floor(j / 3)) * 9 + k + 242
            if (s.has(a) || s.has(b) || s.has(c) || s.has(d)) {
                continue
            }
            s.add(a)
            s.add(b)
            s.add(c)
            s.add(d)
            data[i][j] = k
            ++count
        }
    }
    _initSudoku2(data) {
        const matrix = this.convertDataToMatrix(data)
        // const solve = dlx.solve(matrix)
        // console.log('solve', solve)

    }
}