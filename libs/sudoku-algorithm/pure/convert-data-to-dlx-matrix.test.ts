import {describe, test, expect} from 'vitest'
import dlx  from 'dlx'
import {dlxmain} from './dlx'
import {convert2, convertDataToDlxMatrix, convertRowToPos, getRoom} from "./convert-data-to-dlx-matrix";
describe('', () => {
    test('' ,() => {
        var problem = [
            [0, 0, 1, 0, 1, 1, 0],
            [1, 0, 0, 1, 0, 0, 1],
            [0, 1, 1, 0, 0, 1, 0],
            [1, 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 1],
            [0, 0, 0, 1, 1, 0, 1],
        ];

        var solutions = dlx.solve(problem);
        console.log(solutions)
    })
    test('2', () => {
        var problem =[
            [
                0, 0, 9, 0, 0,
                0, 0, 0, 0
            ],
            [
                7, 0, 0, 0, 0,
                0, 0, 0, 0
            ],
            [
                6, 0, 0, 0, 0,
                5, 0, 0, 0
            ],
            [
                0, 0, 0, 0, 0,
                0, 7, 8, 0
            ],
            [
                0, 0, 0, 0, 0,
                9, 6, 3, 0
            ],
            [
                0, 0, 0, 0, 0,
                0, 0, 0, 0
            ],
            [
                0, 0, 0, 0, 0,
                0, 0, 0, 0
            ],
            [
                0, 5, 0, 0, 2,
                0, 0, 0, 0
            ],
            [
                0, 0, 0, 0, 0,
                0, 0, 0, 0
            ]
        ]
        const solutions = dlxmain(problem)
        console.log(solutions)
    })
    test('3' , () => {
        var problem = [
            [1, 0],
            [0, 1],
            [1, 0]
        ]
        const solution = dlx.solve(problem)
        console.log(solution)
    })
    test('4' , () => {
        var problem = [
            // [0,1,0,0],
            // [3,0,1,0],
            // [2,3,4,1],
            // [0,0,0,0]
            [3,2,0,0],
            [0,1,4,0],
            [4,3,2,0],
            [0,0,0,0]
        ]
        const matrix = convert2(problem)
        // console.log('matrix', matrix)
        const solutions = dlx.solve(matrix)
        console.log('solutions', solutions)
        const ans = new Array(4).fill(0)
        for (let i = 0; i < ans.length; ++i) {
            ans[i] = new Array(4)
        }
        solutions.flat(Infinity).forEach((row) => {
            const [i,j,k] = convertRowToPos(row)
            ans[i][j] = k
        })
        console.log('ans', ans)
    })
    test('getRoom', () => {
        expect(getRoom(0,0)).toBe(1)
        expect(getRoom(0,1)).toBe(1)
        expect(getRoom(1,0)).toBe(1)
        expect(getRoom(1,1)).toBe(1)
        expect(getRoom(1,2)).toBe(2)
        expect(getRoom(2,1)).toBe(3)
        expect(getRoom(3,3)).toBe(4)

    })
});