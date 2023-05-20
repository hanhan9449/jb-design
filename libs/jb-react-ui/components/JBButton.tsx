import {PropsWithChildren} from "react";

export type JSButtonProps = PropsWithChildren<{}>
export function JBButton(props: JSButtonProps) {
    return <button>{props.children}</button>
}