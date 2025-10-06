
import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Card, CardContent, Typography, Chip, IconButton, TextField, Button, CircularProgress, Tooltip } from '@mui/material';
import { RefreshCw } from 'lucide-react';

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ToastContainer from '../Components/ToastContainer';
import { claimTokens, connectWalletFunc, disconnectWalletFunc, getUserStakes, stakeTokenFunc } from '../utils/walletUtils';
import { FireApi } from '../hooks/useRequest';
import TimeDisplay from '../Components/TimeDuration';
import CountdownTimer from '../Components/CountdownTimer';
import { socket } from '../utils/socket';
import { useCycle } from '../context/CycleContext';

// const MainPage = ({cycleData,loadingData,tokenAddressData}) => {
const MainPage = () => {
  const cycle = useCycle() || {};

  const { cycleData, loadingData, fetchUserStakeInfo,tokenAddressData, userStakeInfoData, userBalanceData } = cycle;



  const [currentPhase, setCurrentPhase] = useState('stake');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [countdown, setCountdown] = useState({ days: 27, hours: 14, minutes: 36, seconds: 9 });
  const [stakeAmount, setStakeAmount] = useState('');
  const [CurrentlyStakeAmount, setCurrentlyStakeAmount] = useState('')
  const [toasts, setToasts] = useState([]);
  const [info, setInfo] = useState(cycleData || "")
  const [loading, setLoading] = useState(false)
  const [userBalance, setUserBalance] = useState(userBalanceData);
  const [userStakeInfo, setUserStakeInfo] = useState(userStakeInfoData);



  const addToast = (type, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), type === 'success' ? 5000 : 8000);
  };
  const removeToast = id => setToasts(prev => prev.filter(t => t.id !== id));





  const connectWallet = async () => {
    console.log(tokenAddressData, 'kjjhskjdhd')
    try {
      addToast('pending', 'Connecting wallet...');
      const result = await connectWalletFunc(tokenAddressData);
      if (result && result.balance) {
        setUserBalance(result.balance)
      }
      if (result && result.address) {
        setIsWalletConnected(true);
        setWalletAddress(result.address);
        // handleGetInfo()
        addToast('success', 'Wallet connected successfully');
      } else {
        addToast('error', 'Failed to connect wallet');
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      addToast('error', 'Failed to connect wallet');
    }
  };
  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress('');
    disconnectWalletFunc()
    addToast('error', 'Wallet disconnected');
  };




  useEffect(() => {
    // handleGetInfo();
    setInfo(cycleData)
  },);


  const handleRefereshStake = async () => {
    // const stakeRes = await getUserStakes();
    const tokenAddress = tokenAddressData || localStorage.getItem("XXssf23TAddress")
    console.log(tokenAddress, 'sakjdaskjdsahk')
    const stakeRes = await getUserStakes(info, tokenAddress);
    console.log(stakeRes, 'KJSDKJHSSDHKJDSSSJKS')
    if (stakeRes.success) {
      console.log(stakeRes.responseData?.userStakes, 'sdkjhaskjdhkjsah')
      setUserStakeInfo(stakeRes.responseData);
      setUserBalance(stakeRes?.responseData?.userBalance)
    } else {
      console.error("Failed to fetch stake info:", stakeRes.message);
    }
  }




  useEffect(() => {
    if (userStakeInfo !== null) {
      console.log("Updated stake info:", userStakeInfo);
    }
  }, [userStakeInfo]);

  


  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0 || info?.phase !== 'Staking') return;
    await stakeTokenFunc(stakeAmount, info, tokenAddressData)

    const tokenAddress = tokenAddressData || localStorage.getItem("XXssf23TAddress")

    const stakeRes = await getUserStakes(info, tokenAddress);
    console.log(stakeRes, 'KJSDKJHSSDHKJDSSSJKS')
    if (stakeRes.success) {
      setCurrentlyStakeAmount(stakeAmount)
      console.log(stakeRes.responseData, 'hello check my mc')
      setUserStakeInfo(stakeRes.responseData);
      setUserBalance(stakeRes?.responseData?.userBalance)

    } else {
      console.error("Failed to fetch stake info:", stakeRes.message);
    }



  };

  
  const handleClaim = async () => {
    try {
      setCurrentlyStakeAmount('')

    
      const cycleId = info?.cycle
      const res = await claimTokens(info);
      if (!res.success) {
        alert(`Error: ${res.message}`);
        return;
      }

      console.log("Claim response:", res);


      const tokenAddress = tokenAddressData || localStorage.getItem("XXssf23TAddress")

      const stakeRes = await getUserStakes(info, tokenAddress);
      console.log("User stake info:", stakeRes);

      if (stakeRes.success) {
        setUserStakeInfo(stakeRes.responseData);
        setUserBalance(stakeRes?.responseData?.userBalance)

      } else {
        console.error("Failed to fetch stake info:", stakeRes.message);
      }
    } catch (error) {
      console.error("Claim failed:", error);
      alert("Something went wrong while claiming tokens");
    }
  };




  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'rest': return '#94A3B8';
      case 'stake': return '#7DC4FF';
      case 'claim': return '#00C48C';
      default: return '#94A3B8';
    }
  };


  const shortenAddress = (addr) => {
    if (!addr) return "";
    if (addr === "0x0000000000000000000000000000000000000000") return "0x0";
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  };

  useEffect(()=>{
    setUserStakeInfo(userStakeInfoData)
    setUserBalance(userBalanceData)
    console.log('jjaskjhaskdsahkjsdhdhkshkjsdhkfjh',userBalanceData,userStakeInfoData)
  },[userBalanceData,userStakeInfoData])
  



  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0B1523', color: '#E2E8F0', fontFamily: 'Inter, sans-serif' }}>
      <Header
        isWalletConnected={isWalletConnected}
        walletAddress={walletAddress}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
      />

      {loading ? (
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (

        <>
          <Container sx={{ py: 4 }}>


            <Card sx={{ p: 3, textAlign: 'center', mb: 4, bgcolor: '#111827', borderRadius: '12px' }}>
              {/* Current Phase Header */}
              <Box display="flex" justifyContent="center" gap={2} mb={2} alignItems="center" flexWrap="wrap">
                <Chip
                  label={`CYCLX  v${info?.cycle}`}
                  // label="CYCLX"
                  sx={{ bgcolor: 'transparent', color: '#94A3B8', borderColor: '#94A3B8' }}
                  variant="outlined"
                />
                <Chip
                  // label={`${currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)} Phase`}
                  label={`${info?.phase} Phase`}
                  sx={{ bgcolor: getPhaseColor(), color: '#0B1523', fontWeight: 600 }}
                />
              </Box>


              {/* <CountdownTimer targetTimestamp={info?.startTimestamp} label='Start Staking' /> */}
              <CountdownTimer targetTimestamp={info?.stakingEnd} label='Staking End' />
              <CountdownTimer targetTimestamp={info?.claimEnd} label='Claim End' />
              <Typography variant="caption" sx={{ color: '#94A3B8', letterSpacing: '1.5px', mb: 3 }}>
                DD : HH : MM : SS
              </Typography>


            </Card>



            <Grid container spacing={4} >
              {/* Balances */}
              <Grid item xs={12} md={4} >

                <Card sx={{ bgcolor: '#111827', color: '#E2E8F0', borderRadius: '12px' }}>
                  <CardContent>
                    {/* Title & Refresh Button */}
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" sx={{ color: '#94A3B8' }}>Your {`CYCLX  v${info?.cycle}`} Balance</Typography>
                      <IconButton sx={{ color: '#7DC4FF', cursor: 'pointer' }} onClick={handleRefereshStake} >
                        <RefreshCw size={16} />
                      </IconButton>
                    </Box>

                    {/* Balance */}
                    {/* userStakeInfo */}
                    {/* <Typography variant="h5" sx={{ fontWeight: 600 }}>{ info?.totalStaked}</Typography> */}
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>{userStakeInfo?.userStakes || 0}</Typography>

                    <Typography variant="body2" sx={{ color: '#94A3B8' }}>CYCLX</Typography>

                    {/* Currently Staked Amount */}
                    <Box mt={2}>
                      <Typography variant="body2" sx={{ color: '#94A3B8' }}>Currently Staked</Typography>
                      <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>{CurrentlyStakeAmount || 0} CYCLX</Typography>
                    </Box>
                    {/* Active Version */}
                    <Box mt={2}>
                      <Typography variant="body2" sx={{ color: '#94A3B8' }}>Active Version</Typography>
                      <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>{`CYCLX  v${info?.cycle}`}</Typography>
                    </Box>
                    <Box mt={2}>
                      <Typography variant="body2" sx={{ color: '#94A3B8' }}>User Balance</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {/* {String(userBalance)} */}
                        {String(userStakeInfo?.userBalance ?? userBalance ?? "0").slice(0, 5)}
                      </Typography>

                    </Box>
                  </CardContent>
                </Card>

                <Card sx={{ bgcolor: '#111827', mt: 2, borderRadius: '12px', opacity: 0.8 }}>
                  <CardContent>
                    <Typography variant="body2" sx={{ color: '#94A3B8' }}>Previous Version</Typography>
                    {/* <Typography variant="h5" sx={{ fontWeight: 600 }}>{info?.previoustoken || previousBalance}</Typography> */}
                    <Tooltip title={info?.previoustoken || ""}>
                      <Typography sx={{ color: "#94a3b8", mb: 1, cursor: "pointer" }}>
                        {shortenAddress(info?.previoustoken)}
                      </Typography>
                    </Tooltip>

                    <Typography variant="body2" sx={{ color: '#94A3B8' }}>{`CYCLX  v${info?.cycle > 1 ? info?.cycle - 1 : ""}`}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Action Panel */}
              <Grid item xs={12} md={8} >
                {currentPhase === 'stake' && isWalletConnected && (
                  <Card sx={{ bgcolor: '#111827', color: '#E2E8F0', borderRadius: '12px' }}>
                    <CardContent>
                      <Typography variant="h6" mb={2} sx={{ fontWeight: 600 }}>Stake CYCLX Tokens</Typography>
                      {info?.phase === 'Staking' ? (
                        <>
                          <TextField
                            type="number"
                            fullWidth
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
                            placeholder="0.0"
                            variant="outlined"
                            InputProps={{ style: { color: '#E2E8F0', borderRadius: '6px' } }}
                            sx={{ mb: 1 }}
                          />
                          <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                            ≈ 0.0013 ETH gas
                          </Typography>
                          <Button
                            fullWidth
                            variant="contained"
                            sx={{
                              mt: 2,
                              bgcolor: '#00C48C',
                              color: '#0B1523',
                              fontWeight: 600,
                              borderRadius: '6px',
                              '&:hover': { bgcolor: '#00b37d' },
                            }}
                            disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
                            onClick={handleStake}
                          >
                            Stake CYCLX
                          </Button>
                        </>
                      ) : info?.phase === 'Claiming' ? (   // 👈 yahan pe ? lagana hai
                        // <Button
                        //   fullWidth
                        //   variant="contained"
                        //   sx={{
                        //     mt: 2,
                        //     bgcolor: '#00C48C',
                        //     color: '#0B1523',
                        //     fontWeight: 600,
                        //     borderRadius: '6px',
                        //     '&:hover': { bgcolor: '#00b37d' },
                        //   }}
                        //   onClick={handleClaim}
                        // >
                        //   Claim CYCLX
                        // </Button>
                        userStakeInfo?.userStakes > 0 ? (
                          <Button
                            fullWidth
                            variant="contained"
                            sx={{
                              mt: 2,
                              bgcolor: '#00C48C',
                              color: '#0B1523',
                              fontWeight: 600,
                              borderRadius: '6px',
                              '&:hover': { bgcolor: '#00b37d' },
                            }}
                            onClick={handleClaim}
                          >
                            Claim CYCLX
                          </Button>
                        ) : (
                          <Typography>No Stake Token</Typography>
                        )
                      ) : (
                        <Button
                          fullWidth
                          variant="contained"
                          disabled
                          sx={{
                            mt: 2,
                            bgcolor: '#00C48C',
                            fontWeight: 600,
                            borderRadius: '6px',
                            cursor: 'not-allowed',
                            color: 'white',
                            '&:hover': { bgcolor: '#00b37d' },
                          }}
                          onClick={handleClaim}
                        >
                          Rest
                        </Button>
                      )}



                    </CardContent>
                  </Card>
                )}
              </Grid>
            </Grid>
          </Container>
        </>
      )}
      <Footer />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </Box>
  );
};

export default MainPage;
