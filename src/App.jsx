import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import TheGame from './TheGame.jsx'
import NewGame from './NewGame.jsx'

function App() {

  return (
      <Routes>
        <Route path="/" element={<NewGame />} />
        <Route path="/game" element={<TheGame />} />
      </Routes>
  )
}

export default App
