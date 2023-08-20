import './App.css'
import {Board, BoardObserver} from "./Board.tsx";
import { useCoreState2, } from "./useCoreState.ts";
import {Header} from "./Header.tsx";
import {Space} from "./Space.tsx";
import {StatusBar} from "./StatusBar.tsx";
import {ToolBar} from "./ToolBar.tsx";
import {NumberBar} from "./NumberBar.tsx";

function App() {

    const core = useCoreState2()
    function handleClick() {
        core.incTest()

    }
    console.log('core', core)

    return (
        <div className={'app'}>
            <Space value={20}/>
            <Header/>
            <Space value={10}/>
            <StatusBar/>
            <Space value={10}/>
            <div onClick={handleClick}>state: {core.test}</div>
            <div>hello, this is ${"{"}blog-power-by-react{"}"}</div>
            <BoardObserver rows={9}/>
            <Space value={10}/>
            <ToolBar/>
            <Space value={10}/>
            <NumberBar/>
        </div>
    )
}

export default App
