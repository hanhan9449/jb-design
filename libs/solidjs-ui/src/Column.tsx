import {ParentProps} from "solid-js";
import localStyle from './Column.module.pcss'

interface ColumnProps {
    space?: number
}
export function Column(p: ParentProps<ColumnProps>) {
    return <div
        style={{'--space': p.space}}
        class={localStyle.column}>{p.children}</div>
}