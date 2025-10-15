import { useEffect, useState } from 'react'
import MainPage from './Pages/MainPage'
import { Routes, Route } from 'react-router-dom'
import AdminLogin from './Pages/AdminLogin'
import AdminHomePage from './Pages/AdminHomePage'
import PageNotFound from './Pages/PageNotFound'
import ProtectedRoute from './Components/ProtecteRoute'


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
