import {createEffect, createResource, Show, untrack} from "solid-js";
import {toDataURL} from 'qrcode'

interface QrCodeProps {
    value?: string | null
}

export function QrCode(p: QrCodeProps) {

    const WIDTH = 300
    const canvasEl = document.createElement('canvas')
    const [qrDataUrl, {refetch}] = createResource(() => p.value, async () => {
        console.log('createResource', p.value)
        if (typeof p.value !== "string" || p.value.length === 0) {
            return ''
        }
        return await toDataURL(canvasEl, p.value, {
            width: WIDTH,
            margin: 0
        })
    })
    createEffect(() => {
        const value = p.value
        untrack(() => {
            console.log('value', value)
            refetch(value)
        })
    })
    return <Show when={p.value?.length || 0 > 0}>
        <img width={WIDTH} height={WIDTH} src={qrDataUrl()}/>
    </Show>
}