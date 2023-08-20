import {describe, test, expect} from 'vitest'
import {SudokuData, SudokuData2} from "./sudoku-data";
import {randomInt} from "crypto";
describe('sudoku-data test suite', () => {
    test('test work nice!', () => {
        expect(1 + 1).toBe(2)
    })

    test('generate sudoku', () => {
        const sudokuData = new SudokuData(3,3,3,3,9)
        sudokuData.generate()
        console.log(sudokuData.data)
        sudokuData.consoleData()
    })
    test('4*4 sudoku', () => {
        const sudokuData = new SudokuData(2,2,2,2,4)
        sudokuData.data = [
            [4,1,2,3],
            [3,2,1,4],
            [2,3,4,1],
            [0,0,0,0]
        ]
        sudokuData.data = [
            [3,2,0,0],
            [0,1,4,0],
            [4,3,2,0],
            [0,0,0,0]
        ]
        // sudokuData.solve(sudokuData.data)
        sudokuData.generate(7)
    })
    test('9 * 9 sudoku 2', () => {
        const sudokuData = new SudokuData2()
        const data = sudokuData.generate()
        sudokuData.consoleData(data)
    })
    test('9*9 sudoku', () => {
        const sudokuData = new SudokuData(3,3,3,3,9)
        sudokuData.generate()
    })
    test('getRoom', () => {
        const sudokuData = new SudokuData(2,2,2,2,4)
        expect(sudokuData.getRoom(0,0)).toBe(1)
        expect(sudokuData.getRoom(0,1)).toBe(1)
        expect(sudokuData.getRoom(1,0)).toBe(1)
        expect(sudokuData.getRoom(1,1)).toBe(1)
        expect(sudokuData.getRoom(0,2)).toBe(2)
        expect(sudokuData.getRoom(0,3)).toBe(2)
        expect(sudokuData.getRoom(1,2)).toBe(2)
        expect(sudokuData.getRoom(1,3)).toBe(2)
        //
        expect(sudokuData.getRoom(2,0)).toBe(3)
        expect(sudokuData.getRoom(2,1)).toBe(3)
        expect(sudokuData.getRoom(3,0)).toBe(3)
        expect(sudokuData.getRoom(3,1)).toBe(3)
        expect(sudokuData.getRoom(2,2)).toBe(4)
        expect(sudokuData.getRoom(2,3)).toBe(4)
        expect(sudokuData.getRoom(3,2)).toBe(4)
        expect(sudokuData.getRoom(3,3)).toBe(4)

    })
    test('randomInt', () => {
        for (let i = 0; i < 10000; ++i) {
            expect(randomInt(0,9)).not.toBe(8)
        }
    })
});