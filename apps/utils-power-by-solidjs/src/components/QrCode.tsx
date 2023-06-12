import {createEffect, createResource, Show, untrack} from "solid-js";
import {toDataURL} from 'qrcode'
import localStyle from './QrCode.module.pcss'

interface QrCodeProps {
    value?: string | null
    canvas?: HTMLCanvasElement
}

export function QrCode(p: QrCodeProps) {

    const WIDTH = 300
    const canvasEl = p.canvas || document.createElement('canvas')
    const maskEl = document.createElement('canvas')
    canvasEl.height = 300
    canvasEl.width = 300

    const [qrDataUrl, {refetch}] = createResource(() => p.value, async () => {
        console.log('createResource', p.value)
        if (typeof p.value !== "string" || p.value.length === 0) {
            return ''
        }
        // return ''
        const dataUrl =  await toDataURL(maskEl, p.value, {
            width: WIDTH,
            margin: 0,
            color: {
                light: '#0000',
                dark: ''
            },
            type: 'image/png'
        })
        const ctx = canvasEl.getContext('2d')
        if (!ctx) {
            return
        }
        const gradient = ctx.createLinearGradient(0, 0, WIDTH, WIDTH)
        gradient.addColorStop(0.1, 'peru')
        gradient.addColorStop(0.3, 'pink')
        gradient.addColorStop(0.7, 'tan')
        gradient.addColorStop(0.9, 'lightseagreen')
        ctx.fillStyle = gradient
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillRect(0, 0, 300, 300)
        ctx.globalCompositeOperation = "destination-in"
        ctx.drawImage(maskEl, 0, 0, 300, 300)
        return dataUrl
    })
    createEffect(() => {
        const value = p.value
        untrack(() => {
            refetch(value)
        })
    })
    return <Show when={p.value?.length || 0 > 0}>
        {canvasEl}
    </Show>
}