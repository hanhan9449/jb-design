import {Observable} from "rxjs";
import {useEffect, useRef, useState} from "react";

export function useObservable<E extends any, T extends Observable<E>>(observable: T) {
    const [state, setState] = useState<E>();
    useEffect(() => {
        if (observable) {
            let id = observable.subscribe(data => {
                setState(data)
            })
            return () => id.unsubscribe()
        }
    }, [] );
    return state
}