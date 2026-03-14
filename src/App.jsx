import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import TheGame from './TheGame.jsx'
import NewGame from './NewGame.jsx'
import Home from './Home.jsx'
import Onboarding from './Onboarding.jsx'
import { useLocalStorage } from "@uidotdev/usehooks"
import { Navigate } from 'react-router-dom'


function App() {
  const [savedClan] = useLocalStorage("savedClan", null);

  return (
    <Routes>
      <Route path="/newgame" element={<NewGame />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/" element={savedClan ? <Home /> : <Navigate to="/newgame" />} />
      <Route path="/game" element={savedClan ? <TheGame /> : <Navigate to="/newgame" />} />
    </Routes>
  )
}

export default App
