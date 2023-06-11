import {JSX, ParentProps, splitProps} from 'solid-js'
import {geneComponentTestProperty, mergeClasses} from '@jb/utils'
import localStyle from './JBButton.module.pcss'

// import {atom} from './atom-css'
// console.log('atom', atom)

export type JBButtonProps = {

} & JSX.ButtonHTMLAttributes<HTMLButtonElement>
export function JBButton(p: ParentProps<JBButtonProps>) {
    const [local, rest] = splitProps(p, ['children', 'class'])
    return <button
        {...geneComponentTestProperty('JBButton')}
        class={mergeClasses(localStyle.button, local.class)}
        {...rest}>{local.children}</button>
}