import { useState } from 'react'

import './App.css'
import TodoAdd from './components/TodoAdd'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <TodoAdd/>
    </>
  )
}

export default App
