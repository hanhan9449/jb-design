import {mergeClasses} from '@jb/utils'
import {useCoreState2} from "./useCoreState.ts";
import {useRef, useState} from "react";
export function NumberBar() {
    const core = useCoreState2()
    return <div
        className={'number-bar'}
        style={{
    }}>
        {core.numberBar.map(it => <NumberBarItem number={it.name} count={it.count}/>  )}
    </div>
}
function NumberBarItem({number, count}) {
    const hidden = count === 0
    const [active, setActive] = useState(false)
    const core = useCoreState2()
    function handleClick() {
        core.handleNumberBarItemClick(number)
        setActive(true)
        setTimeout(() => {
            setActive(false)
        }, 500)
    }
    return <div
        onClick={handleClick}
        className={mergeClasses('number-bar-item', hidden && 'hidden', active && 'active')}>
        <div className={'number-bar-item-main'}>{number}</div>
        <div className={'number-bar-item-count'}>{count}</div>
    </div>
}