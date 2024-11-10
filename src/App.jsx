
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Game from './pages/Game'
import Instructions from './pages/Instructions'
import { GameProvider } from './context/GameContext'


function App() {

  return (
    <GameProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/instructions" element={<Instructions />} />
      </Routes>
    </GameProvider>
  )
}

export default App
