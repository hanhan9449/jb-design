import {ParentProps} from "solid-js";
import localStyle from './Row.module.pcss'

interface RowProps {
    space?: number
}
export function Row(p: ParentProps<RowProps>) {
    return <div
        style={{'--space': p.space}}
        class={localStyle.row}>{p.children}</div>
}