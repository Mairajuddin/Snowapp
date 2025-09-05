import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import MainPage from './Pages/MainPage'
import { Routes, Route } from 'react-router-dom'
import AdminLogin from './Pages/AdminLogin'
import AdminHomePage from './Pages/AdminHomePage'
import PageNotFound from './Pages/PageNotFound'
import ProtectedRoute from './Components/ProtecteRoute'

function App() {
  const [count, setCount] = useState(0)

  return (

    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={
            <ProtectedRoute>
              <AdminHomePage />
            </ProtectedRoute>
          }  />
      <Route path="*" element={<PageNotFound />} />

    </Routes>
  )
}

export default App
