import type { Component } from 'solid-js';
import {QrCode} from "./components/QrCode";
import {createSignal, onMount} from "solid-js";
import copy from 'copy-to-clipboard'
import {mergeClasses} from '@jb/utils'
import {atom} from "./atom-css";


const App: Component = () => {
    const [input, setInput] = createSignal('')
    onMount(() => {
        const u = new URL(location.href)
        let share = u.searchParams.get('share');
        console.log('share', share)
        if (share) {
            setInput(share)
        }
    })
  return (
    <div>
        <h2>二维码生成</h2>
        <div>


        <textarea
            class={mergeClasses(atom.width500px, atom.fontSize20px, atom.fontFamilySanSerif)}
            value={input()} onInput={(e) => {
            setInput(e.target.value)
        }}/>
        </div>
        <div>
            <button onClick={() => {
                copy(input())
                alert('复制成功')
            }}>Copy</button>
            <button onClick={() => {
                const u = new URL(location.href)
                u.searchParams.set('share', input())
                copy(String(u))
            }}>Share link</button>
        </div>
        <div>


      <QrCode value={input()}/>
        </div>

    </div>
  );
};

export default App;
