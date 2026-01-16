import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Army from './Army.jsx'
import Lane from './Lane.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="playing-field">
      <Army className="enemy army" />
      <Lane />
      <Army className="user army" />
    </main>
  )
}

export default App
