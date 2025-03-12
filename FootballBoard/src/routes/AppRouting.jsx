import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { GamePage } from '../pages/GamePage'
import { Header } from '../components/Layout/Header/Header'
import { Main } from '../components/Layout/Main/Main'
import { LeagueFixtures } from '../pages/LeagueFixtures'
import { TeamFixtures } from '../pages/TeamFixtures'

export function AppRouting() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Main/>}>
            <Route index path='/home' element={<HomePage/>}/>
            <Route path='/game' element={<GamePage />} />
            <Route path='/leagueFixtures' element={<LeagueFixtures/>}/>
            <Route path='/teamFixtures/:teamId' element={<TeamFixtures/>}/>
          </Route>
        </Routes>
    </Router>
  )
}