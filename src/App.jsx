import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import MainPage from './Pages/MainPage'
import { Routes, Route } from 'react-router-dom'
import AdminLogin from './Pages/AdminLogin'
import AdminHomePage from './Pages/AdminHomePage'
import PageNotFound from './Pages/PageNotFound'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <>
    // <MainPage/>
    // </>
    <Routes>
      <Route path="/" element={<MainPage />} />
  <Route path="/admin-login" element={<AdminLogin />} />
  <Route path="/admin" element={<AdminHomePage />} />
        <Route path="*" element={<PageNotFound />} />

    </Routes>
  )
}

export default App
