import type { Component } from "solid-js";
import { QrCode } from "./components/QrCode";
import { createSignal, onMount } from "solid-js";
import copy from "copy-to-clipboard";
import { mergeClasses } from "@jb/utils";
import { atom } from "./atom-css";
import { JBButton, JBTextarea } from "@jb/solidjs-ui";
import "@jb/solidjs-ui/style.css";
import {toCanvas, toDataURL} from "qrcode";

const App: Component = () => {
  const [input, setInput] = createSignal("");
  onMount(() => {
    const u = new URL(location.href);
    let share = u.searchParams.get("share");
    console.log("share", share);
    if (share) {
      setInput(share);
    }
  });
  let canvasEl = document.createElement('canvas')
  return (
    <div>
      <h2>二维码生成</h2>
      <div>
        <JBTextarea
          class={mergeClasses(
            atom.width500px,
            atom.fontSize20px,
            atom.fontFamilySanSerif
          )}
          value={input()}
          onInput={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      <div>
        <JBButton
          onClick={() => {
            copy(input());
          }}
        >
          Copy Text
        </JBButton>
          <JBButton onClick={async () => {
              canvasEl.toBlob(blob => {
                  if (blob) {
                      navigator.clipboard.write([
                          new ClipboardItem({
                              "image/png": blob
                          })
                      ])
                  }
              })
          }}>
              Copy Image
          </JBButton>
        <JBButton
          onClick={() => {
            const u = new URL(location.href);
            u.searchParams.set("share", input());
            copy(String(u));
          }}
        >
          Share Config link
        </JBButton>
      </div>
      <div>
        <QrCode value={input()} canvas={canvasEl} />
      </div>
    </div>
  );
};

export default App;
