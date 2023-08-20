import {geneComponentTestProperty} from '@jb/utils'
import {Item, ItemObserver} from "./Item.tsx";
import { useCoreState2} from "./useCoreState.ts";
import './board.css'
import {observer} from "mobx-react-lite";
interface BoardProps {
    rows: 9
}
export function Board(props: BoardProps) {
    const core = useCoreState2()

    if (!core.boardData) {
        return null
    }
    return <div
        style={{
        }}
        {...geneComponentTestProperty('board')} className={'board'}>
        {core.boardData.map((row, index) => {
            return row.map((it, index2) => <ItemObserver key={`${index}:${index2}`} row={index+1} value={it} column={index2+ 1}/>)
        })}

    </div>
}
export const BoardObserver = observer(Board)