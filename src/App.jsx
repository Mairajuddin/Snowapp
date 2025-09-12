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

function App() {
  
  const [cycleData,setCycleData]=useState()
  const [loadingData,setLoadingData]=useState(false)
  const [tokenAddressData,setTokenAddressData]=useState()

 const fetchCycle = async () => {
    try {
      setLoadingData(true)
      const response = await FireApi("get-cycle", "GET");

      if (response?.success || response?.ok) {
        console.log("Cycle Data:", response?.data);
        setCycleData(response?.data)
        setTokenAddressData(response?.data?.stakedToken)
        localStorage.setItem('XXssf23TAddress',response?.data?.stakedToken)
              setLoadingData(false)

        // setInfo(response?.data) // if you want to store it in state
      }
    } catch (error) {
      setLoadingData(false)
      console.error("API call failed:", error);
    }
  };

  useEffect(() => {
    fetchCycle();
    
    socket.on("getCycle", (MESSAGE) => {
      console.log("SOCKET EVENT getCycle:", MESSAGE);
      fetchCycle();
    });

    return () => {
      socket.off("getCycle");
    };
  }, []);

  return (

    <Routes>
      <Route path="/" element={<MainPage cycleData={cycleData} loadingData={loadingData} tokenAddressData={tokenAddressData}/>} />
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
