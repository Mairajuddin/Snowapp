import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import MainPage from './Pages/MainPage'
import { Routes, Route } from 'react-router-dom'
import AdminLogin from './Pages/AdminLogin'
import AdminHomePage from './Pages/AdminHomePage'
import PageNotFound from './Pages/PageNotFound'
import ProtectedRoute from './Components/ProtecteRoute'
import { FireApi } from './hooks/useRequest'
import { socket } from './utils/socket'
import { getUserStakes } from './utils/walletUtils'

function App() {
 const { VITE_RPC_URL, VITE_STAKING_ADDRESS, VITE_BASE_URL } = import.meta.env;

  console.log(VITE_STAKING_ADDRESS, VITE_RPC_URL, VITE_BASE_URL, 'env test');

  return (

    <Routes>
      {/* <Route path="/" element={<MainPage cycleData={cycleData} tokenAddressData={tokenAddressData}/>} /> */}
      <Route path="/" element={<MainPage/>} />

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
