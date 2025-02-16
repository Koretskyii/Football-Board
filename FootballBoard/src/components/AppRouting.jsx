import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { GamePage } from '../pages/GamePage'

export function AppRouting() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/game' element={<GamePage />} />
    </Routes>
  )
}