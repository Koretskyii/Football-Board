import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { AppRouting } from './components/AppRouting'
import { Header } from './components/Layout/Header/Header'
import { Main } from './components/Layout/Main/Main'
function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Main/>
        <AppRouting/>
      </BrowserRouter>
    </>
  )
}

export default App
