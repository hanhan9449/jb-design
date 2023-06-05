import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {JBButton} from '@jb/react-ui'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <JBButton >Hello world!</JBButton>
    </>
  )
}

export default App
