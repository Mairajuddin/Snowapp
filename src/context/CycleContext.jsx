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

  const fetchCycle = async () => {
    try {
      setLoadingData(true);
      const response = await FireApi("get-cycle", "GET");

      if (response?.success || response?.ok) {
        setCycleData(response?.data);
        setTokenAddressData(response?.data?.stakedToken);
        console.log(response?.data, 'cycle ddata check')
        localStorage.setItem("XXssf23TAddress", response?.data?.stakedToken);

        const stakeRes = await getUserStakes(response?.data?.cycle, response?.data?.stakedToken);
        setUserStakeInfo(stakeRes.responseData);
        setUserBalance(stakeRes?.responseData?.userBalance)
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
    <CycleContext.Provider value={{ cycleData, loadingData, tokenAddressData, fetchCycle, userBalanceData, userStakeInfoData }}>
      {children}
    </CycleContext.Provider>
  );
};

export const useCycle = () => useContext(CycleContext);
