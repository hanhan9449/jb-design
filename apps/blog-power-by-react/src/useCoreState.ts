import {createContext, useContext} from "react";
import {BehaviorSubject, map, Observable, take, tap} from "rxjs";
import {useObservable} from '@jb/utils'
import {useLocalObservable} from "mobx-react-lite";
import {makeAutoObservable} from "mobx";
import {COMPUTED_STRUCT} from "mobx/dist/api/computed";
import {getArea} from "./utils/getArea.ts";
import {SudokuData} from '@jb/sudoku-algorithm'




function random(arr) {
    return arr.sort((p, c) => Math.random() > .5 ? 1 : -1)
}
class CoreState {
    constructor() {
        makeAutoObservable(this)
    }
    private _sudokuData = new SudokuData()
    boardData= [
        random([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        random([1, 2, null, 4, 5, 6, 7, 8, 9]),
        random([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        random([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        random([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        random([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        random([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        random([1, 2, 3, 4, 5, 6, 7, 8, 9]),
        random([1, 2, 3, 4, 5, 6, 7, 8, null]),
    ]
    activeNumber = null as number | null
    activeNumberAnimate = true
    setCanAnimate(flag: boolean) {
        this.activeNumberAnimate = flag
    }
    activeRow= null
    activeColumn= null
    activeArea = null
    numberBar = [
        {name: 1, count: 3},
        {name: 2, count: 4},
        {name: 3, count: 1},
        {name: 4, count: 4},
        {name: 5, count: 0},
        {name: 6, count: 4},
        {name: 7, count: 4},
        {name: 8, count: 9},
        {name: 9, count: 4},
    ]
    handleNumberBarItemClick(n: number) {
        this._log('handleNumberBarItemCLick', n)
        if (!this.activeRow || !this.activeColumn) {
            return
        }
        debugger
        if (this.boardData[this.activeRow - 1][this.activeColumn - 1]) {
            return
        }
        this.boardData[this.activeRow - 1][this.activeColumn - 1] = n
        this.activeNumber = n

    }
    private _log(...msgs: any[]) {
        console.log('[coreState]', ...msgs)
    }

    handleClick(row: number, column: number, value: number) {
        this.activeRow = row
        this.activeColumn = column
        this.activeNumber = value
        this.activeArea = getArea(row, column)
    }
}


let _state: InstanceType<typeof CoreState>
function initializer() {
    if (!_state) {
        _state =  new CoreState()
    }
    return _state
}

export function useCoreState2() {
    return useLocalObservable(initializer)
}