import { createContext, useContext, useEffect, useState } from "react";

import { FireApi } from "../hooks/useRequest";
import { getCycleInfo, getUserStakes } from "../utils/walletUtils";

const CycleContext = createContext();

export const CycleProvider = ({ children }) => {
  const [cycleData, setCycleData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [tokenAddressData, setTokenAddressData] = useState(null);
  const [userBalanceData, setUserBalance] = useState();
  const [userStakeInfoData, setUserStakeInfo] = useState(null);

  const fetchUserStakeInfo = async (cycle, tokenAddress) => {
    try {
      const stakeRes = await getUserStakes(cycle?.id, tokenAddress, cycle);
      if (stakeRes.success) {
        setUserStakeInfo(stakeRes.responseData);
        setUserBalance(stakeRes?.responseData?.userBalance);
      } else {
        console.error("Failed to fetch stake info:", stakeRes.message);
      }
    } catch (error) {
      console.error("Error fetching user stake info:", error);
    }
  };

  // const fetchCycle = async () => {
  //   try {
  //     setLoadingData(true);
  //     const response = await FireApi("get-cycle", "GET");

  //     if (response?.success || response?.ok) {
  //       setCycleData(response?.data);
  //       setTokenAddressData(response?.data?.stakedToken);
  //       console.log(response?.data, "cycle ddata check");
  //       localStorage.setItem("XXssf23TAddress", response?.data?.stakedToken);
  //       await fetchUserStakeInfo(response?.data, response?.data?.stakedToken);
  //     setLoadingData(false);
  //     }
  //   } catch (error) {
  //     console.error("API call failed:", error);
  //     setLoadingData(false);
  //   }
  // };


 const fetchCycle = async () => {
    try {
      setLoadingData(true);
      const response = await getCycleInfo();
      
      if (response?.success) {
        const data = response?.data;
        setCycleData(data);
        setTokenAddressData(data?.stakedToken);

        console.log("Cycle Data from Blockchain:", data);
        localStorage.setItem("XXssf23TAddress", data?.stakedToken);

        await fetchUserStakeInfo(data, data?.stakedToken);
      } else {
        console.error("Failed to fetch cycle info:", response?.message);
      }

      setLoadingData(false);
    } catch (error) {
      console.error("Error fetching cycle info:", error);
      setLoadingData(false);
    }
  };


  useEffect(() => {
  fetchCycle();

  const interval = setInterval(() => {
    fetchCycle();
  }, 30000);

  return () => clearInterval(interval);
}, []);

  

  return (
    <CycleContext.Provider
      value={{
        cycleData,
        loadingData,
        tokenAddressData,
        fetchCycle,
        userBalanceData,
        fetchUserStakeInfo,
        userStakeInfoData,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};

export const useCycle = () => useContext(CycleContext);
