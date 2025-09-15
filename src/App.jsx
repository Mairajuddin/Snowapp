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
  
//   const [cycleData,setCycleData]=useState()
//    const [tokenAddressData,setTokenAddressData]=useState()

//  const fetchCycle = async () => {
//     try {
//       setLoadingData(true)
//       const response = await FireApi("get-cycle", "GET");

//       if (response?.success || response?.ok) {
//         console.log("Cycle Data:", response?.data);
//         setCycleData(response?.data)
//         setTokenAddressData(response?.data?.stakedToken)
//           // if (stakeRes.success) {
//           //   // setUserStakeInfo(stakeRes);
//           // }
//         localStorage.setItem('XXssf23TAddress',response?.data?.stakedToken)
        
//         const stakeRes = await getUserStakes(response?.data?.cycle);
//               setLoadingData(false)
        
        
//         // setInfo(response?.data) // if you want to store it in state
//       }
//     } catch (error) {
//       setLoadingData(false)
//       console.error("API call failed:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCycle();
    
//     socket.on("getCycle", (MESSAGE) => {
//       console.log("SOCKET EVENT getCycle:", MESSAGE);
//       fetchCycle();
//     });

//     return () => {
//       socket.off("getCycle");
//     };
//   }, []);

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
