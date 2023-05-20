import {PropsWithChildren} from "react";
import {mergeClasses} from '@jb/utils'

export type JSButtonProps = PropsWithChildren<{}>
export function JBButton(props: JSButtonProps) {
    return <button className={mergeClasses('1', '2')}>{props.children}</button>
}