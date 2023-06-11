import {JSX, splitProps} from "solid-js";
import localStyle from './JBTextarea.module.pcss'
import {geneComponentTestProperty, mergeClasses} from '@jb/utils'

export type JBTextareaProps = {} & JSX.TextareaHTMLAttributes<HTMLTextAreaElement>
export function JBTextarea(p: JBTextareaProps) {
    const [local, rest] = splitProps(p, ['class'])
    return <textarea
        {...geneComponentTestProperty('JBTextarea')}
        class={mergeClasses(localStyle.textarea, local.class)}
        {...rest}/>
}