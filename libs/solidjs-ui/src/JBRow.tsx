import {ParentProps} from "solid-js";
import localStyle from './JBRow.module.pcss'

interface RowProps {
    space?: number
}
export function JBRow(p: ParentProps<RowProps>) {
    return <div
        style={{'--space': p.space}}
        class={localStyle.row}>{p.children}</div>
}