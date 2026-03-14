import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import TheGame from './TheGame.jsx'
import NewGame from './NewGame.jsx'
import Home from './Home.jsx'
import Onboarding from './Onboarding.jsx'


function App() {

  return (
      <Routes>
        <Route path="/newgame" element={<NewGame />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<TheGame />} />
      </Routes>
  )
}

export default App
