import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../utils/socket";
import { FireApi } from "../hooks/useRequest";
import { getUserStakes } from "../utils/walletUtils";

const CycleContext = createContext();

export const CycleProvider = ({ children }) => {
  const [cycleData, setCycleData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [tokenAddressData, setTokenAddressData] = useState(null);
  const [userBalanceData, setUserBalance] = useState();
  const [userStakeInfoData, setUserStakeInfo] = useState(null);




   const fetchUserStakeInfo = async (cycle, tokenAddress) => {
    
    try {
      const stakeRes = await getUserStakes(cycle, tokenAddress);
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

  const fetchCycle = async () => {
    try {
      setLoadingData(true);
      const response = await FireApi("get-cycle", "GET");

      if (response?.success || response?.ok) {
        setCycleData(response?.data);
        setTokenAddressData(response?.data?.stakedToken);
        console.log(response?.data, 'cycle ddata check')
        localStorage.setItem("XXssf23TAddress", response?.data?.stakedToken);
        await fetchUserStakeInfo(response?.data, response?.data?.stakedToken)
        // const stakeRes = await getUserStakes(response?.data?.cycle, response?.data?.stakedToken);
        // setUserStakeInfo(stakeRes.responseData);
        // setUserBalance(stakeRes?.responseData?.userBalance)
        setLoadingData(false);
      }
    } catch (error) {
      console.error("API call failed:", error);
      setLoadingData(false);
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
    <CycleContext.Provider value={{ cycleData, loadingData, tokenAddressData, fetchCycle, userBalanceData,fetchUserStakeInfo, userStakeInfoData }}>
      {children}
    </CycleContext.Provider>
  );
};

export const useCycle = () => useContext(CycleContext);
