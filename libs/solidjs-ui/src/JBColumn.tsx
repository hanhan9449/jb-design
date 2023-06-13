import {ParentProps} from "solid-js";
import localStyle from './JBColumn.module.pcss'

interface ColumnProps {
    space?: number
}
export function JBColumn(p: ParentProps<ColumnProps>) {
    return <div
        style={{'--space': p.space}}
        class={localStyle.column}>{p.children}</div>
}