import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import TheGame from './TheGame.jsx'

function App() {

  return (
    <main className="playing-field">
      <TheGame />
    </main>
  )
}

export default App
