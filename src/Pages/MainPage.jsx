
import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Card, CardContent, Typography, Chip, IconButton, TextField, Button } from '@mui/material';
import { RefreshCw } from 'lucide-react';

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ToastContainer from '../Components/ToastContainer';
import { connectWalletFunc, disconnectWalletFunc } from '../utils/walletUtils';

const MainPage = () => {
  const [currentPhase, setCurrentPhase] = useState('stake');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [countdown, setCountdown] = useState({ days: 27, hours: 14, minutes: 36, seconds: 9 });
  const [stakeAmount, setStakeAmount] = useState('');
  const [snowBalance, setSnowBalance] = useState('1,234.56');
  const [previousBalance, setPreviousBalance] = useState('800.12');
  const [toasts, setToasts] = useState([]);
  const [isApproved, setIsApproved] = useState(false);

  // Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        else if (days > 0) { days--; hours = 23; minutes = 59; seconds = 59; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const addToast = (type, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => removeToast(id), type === 'success' ? 5000 : 8000);
  };
  const removeToast = id => setToasts(prev => prev.filter(t => t.id !== id));

  // const connectWallet = () => {
  //   setIsWalletConnected(true);
  //   connectWalletFunc()
  //   setWalletAddress('0x1234...5678');
  //   addToast('success', 'Wallet connected successfully');
  // };
  const connectWallet = async () => {
  try {
    addToast('pending', 'Connecting wallet...');
    const result = await connectWalletFunc();
    
    if (result && result.address) {
      setIsWalletConnected(true);
      setWalletAddress(result.address);
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

  const handleApprove = () => {
    addToast('pending', 'Approving CYCLX tokens...');
    setTimeout(() => {
      setIsApproved(true);
      addToast('success', 'CYCLX tokens approved');
    }, 3000);
  };
  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;
    addToast('pending', 'Staking CYCLX tokens...');
    setTimeout(() => {
      addToast('success', `Successfully staked ${stakeAmount} CYCLX`);
      setStakeAmount('');
    }, 4000);
  };
  const getNextPhaseName = () => {
    switch (currentPhase) {
      case 'presale':
        return 'Public Sale';
      case 'public':
        return 'Claiming';
      case 'claiming':
        return 'Distribution';
      default:
        return 'Next Phase';
    }
  }
  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'rest': return '#94A3B8';
      case 'stake': return '#7DC4FF';
      case 'claim': return '#00C48C';
      default: return '#94A3B8';
    }
  };
  const formatNumber = num => num.toString().padStart(2, '0');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0B1523', color: '#E2E8F0', fontFamily: 'Inter, sans-serif' }}>
      <Header
        isWalletConnected={isWalletConnected}
        walletAddress={walletAddress}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
      />

      <Container sx={{ py: 4 }}>

        <Card sx={{ p: 3, textAlign: 'center', mb: 4, bgcolor: '#111827', borderRadius: '12px' }}>
          {/* Current Phase Header */}
          <Box display="flex" justifyContent="center" gap={2} mb={2} alignItems="center" flexWrap="wrap">
            <Chip
              label="CYCLXv3"
              // label="CYCLX"
              sx={{ bgcolor: 'transparent', color: '#94A3B8', borderColor: '#94A3B8' }}
              variant="outlined"
            />
            <Chip
              label={`${currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)} Phase`}
              sx={{ bgcolor: getPhaseColor(), color: '#0B1523', fontWeight: 600 }}
            />
          </Box>

          {/* Current Phase Countdown */}
          <Typography
            variant="h3"
            sx={{ color: '#E2E8F0', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '3px', mb: 0.5 }}
          >
            {formatNumber(countdown.days)}:{formatNumber(countdown.hours)}:{formatNumber(countdown.minutes)}:{formatNumber(countdown.seconds)}
          </Typography>
          <Typography variant="caption" sx={{ color: '#94A3B8', letterSpacing: '1.5px', mb: 3 }}>
            DD : HH : MM : SS
          </Typography>

          <Box
            component="hr"
            sx={{
              borderColor: 'white',
              borderWidth: '1px',
              mb: 3,
              width: '60%',
              my: 2,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />

          {/* Next Phase Info */}
          <Box display="flex" justifyContent="center" gap={1} mb={1} flexWrap="wrap">
            <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 500 }}>
              Next Phase Begins
            </Typography>
            <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 700 }}>
              Pre-Sale
            </Typography>
          </Box>

          {/* Next Phase Countdown */}
          <Typography
            variant="h4"
            sx={{ color: '#E2E8F0', fontFamily: 'monospace', fontWeight: 600, letterSpacing: '2px' }}
          >
            {formatNumber(countdown.days)}d {formatNumber(countdown.hours)}h {formatNumber(countdown.minutes)}m {formatNumber(countdown.seconds)}s
          </Typography>
          <Typography variant="caption" sx={{ color: '#94A3B8', letterSpacing: '1.5px' }}>
            Time Remaining
          </Typography>
        </Card>



        <Grid container spacing={4} >
          {/* Balances */}
          <Grid item xs={12} md={4} >
            {/* <Card sx={{ bgcolor: '#111827', color: '#E2E8F0', borderRadius: '12px' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" sx={{ color: '#94A3B8' }}>Your CYCLXv3 Balance</Typography>
                  <IconButton sx={{ color: '#7DC4FF' }}>
                    <RefreshCw size={16} />
                  </IconButton>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>{snowBalance}</Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>CYCLX</Typography>
              </CardContent>
            </Card> */}
            <Card sx={{ bgcolor: '#111827', color: '#E2E8F0', borderRadius: '12px' }}>
              <CardContent>
                {/* Title & Refresh Button */}
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" sx={{ color: '#94A3B8' }}>Your CYCLXv3 Balance</Typography>
                  <IconButton sx={{ color: '#7DC4FF' }} >
                    <RefreshCw size={16} />
                  </IconButton>
                </Box>

                {/* Balance */}
                <Typography variant="h5" sx={{ fontWeight: 600 }}>{snowBalance}</Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>CYCLX</Typography>

                {/* Currently Staked Amount */}
                <Box mt={2}>
                  <Typography variant="body2" sx={{ color: '#94A3B8' }}>Currently Staked</Typography>
                  <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>{stakeAmount || 0} CYCLX</Typography>
                </Box>

                {/* Active Version */}
                <Box mt={2}>
                  <Typography variant="body2" sx={{ color: '#94A3B8' }}>Active Version</Typography>
                  <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>{"CYCLXv3"}</Typography>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ bgcolor: '#111827', mt: 2, borderRadius: '12px', opacity: 0.8 }}>
              <CardContent>
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>Previous Version</Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>{previousBalance}</Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>CYCLXv2</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Action Panel */}
          <Grid item xs={12} md={8} >
            {currentPhase === 'stake' && isWalletConnected && (
              <Card sx={{ bgcolor: '#111827', color: '#E2E8F0', borderRadius: '12px' }}>
                <CardContent>
                  <Typography variant="h6" mb={2} sx={{ fontWeight: 600 }}>Stake CYCLX Tokens</Typography>
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
                  <Typography variant="caption" sx={{ color: '#94A3B8' }}>≈ 0.0013 ETH gas</Typography>

                  {!isApproved ? (
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2, bgcolor: '#7DC4FF', color: '#0B1523', fontWeight: 600, borderRadius: '6px', '&:hover': { bgcolor: '#6cb4e5' } }}
                      onClick={handleApprove}
                    >
                      Approve CYCLX
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 2, bgcolor: '#00C48C', color: '#0B1523', fontWeight: 600, borderRadius: '6px', '&:hover': { bgcolor: '#00b37d' } }}
                      disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
                      onClick={handleStake}
                    >
                      Stake CYCLX
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>

      <Footer />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </Box>
  );
};

export default MainPage;
