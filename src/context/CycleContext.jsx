import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../utils/socket";
import { FireApi } from "../hooks/useRequest";
import { getUserStakes } from "../utils/walletUtils";

const CycleContext = createContext();

export const CycleProvider = ({ children }) => {
  const [cycleData, setCycleData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [tokenAddressData, setTokenAddressData] = useState(null);

  const fetchCycle = async () => {
    try {
      setLoadingData(true);
      const response = await FireApi("get-cycle", "GET");

      if (response?.success || response?.ok) {
        setCycleData(response?.data);
        setTokenAddressData(response?.data?.stakedToken);
console.log(response?.data,'cycle ddata check')
        localStorage.setItem("XXssf23TAddress", response?.data?.stakedToken);
        
        await getUserStakes(response?.data?.cycle);

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
    <CycleContext.Provider value={{ cycleData, loadingData, tokenAddressData, fetchCycle }}>
      {children}
    </CycleContext.Provider>
  );
};

export const useCycle = () => useContext(CycleContext);
