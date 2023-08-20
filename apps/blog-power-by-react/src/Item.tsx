import {mergeClasses} from '@jb/utils'
import {useCoreState2} from "./useCoreState.ts";
import {observer} from "mobx-react-lite";
import {useEffect, useMemo, useState} from "react";
import {getArea} from "./utils/getArea.ts";
export function Item({value, row, column}) {
    const core = useCoreState2()
    const isActive = (() => {
        console.log('core.activeNumber', core.activeNumber, value)
        if (core.activeNumber === null && value === null) {
            console.log('activeRow', core.activeRow, row, core.activeColumn, column)
            return core.activeRow === row && core.activeColumn === column
        } else {
            return core.activeNumber === value
        }
    })()
    const area = getArea(row, column)
    function getIsActiveLine() {
        if (core.activeColumn === column || core.activeRow === row || core.activeArea === area) {
            return true
        }
    }
    const isActiveLine = getIsActiveLine()
        // core.activeNumber !== null &&  (core.activeRow === row || core.activeColumn === column )
    console.log(core.activeNumber, core.activeRow, core.activeColumn)
    function handleClick() {
        core.handleClick(row, column, value)
        core.setCanAnimate(true)
    }

    const activeAnimate = isActive && core.activeNumberAnimate
    useEffect(() => {
        core.setCanAnimate(true)
    }, [isActive]);
    useEffect(() => {
        console.log('value==', value)
    }, [value]);
    return <div
        className={mergeClasses('board-item',isActive && 'active', activeAnimate && 'active-animate', isActiveLine && 'active-line')}
        onAnimationEnd={() => core.setCanAnimate(false)}
        data-row={row}
        onClick={handleClick}
        data-area={area}
        data-column={column}>
        <div className={'board-item-inner'}>
            {value}
        </div>
    </div>
}

export const ItemObserver = observer(Item)