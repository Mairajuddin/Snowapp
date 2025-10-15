
import React from 'react';
import { AppBar, Toolbar, Typography, Box, Chip, Button, useMediaQuery, useTheme } from '@mui/material';
import { Wallet } from 'lucide-react';
import { createCycle, finalizeCycle, updateCycle } from '../utils/walletUtils';
import { useCycle } from '../context/CycleContext';
import { toast } from 'react-toastify';

const Header = ({ isWalletConnected, walletAddress, connectWallet, disconnectWallet }) => {

  const cycle = useCycle() || {};

  const {
    cycleData,
    loadingData,
    fetchUserStakeInfo,
    tokenAddressData,
    userStakeInfoData,
    userBalanceData,
    fetchCycle
  } = cycle;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // < 640px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg')); // 640-1024px
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // > 1024px

  // Shorten address differently based on screen size
  const formatAddress = (address) => {
    if (!address) return '';
    if (isMobile) return `${address.slice(0, 3)}...${address.slice(-3)}`;
    if (isTablet) return `${address.slice(0, 6)}...${address.slice(-4)}`;
    return `${address.slice(0, 10)}...`;
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: 'transparent',
        boxShadow: 'none',
        borderBottom: '1px solid #1E293B',
        px: isMobile ? 1 : 2
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          minHeight: isMobile ? 56 : 64 // Adjust toolbar height
        }}
        disableGutters
      >
        {/* Logo - Always visible */}
        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{
            width: isMobile ? 28 : 32,
            height: isMobile ? 28 : 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            ❄
          </Box>
          <Typography
            variant={isMobile ? 'subtitle1' : 'h6'}
            sx={{ fontWeight: 600 }}
          >
            CYCLX
          </Typography>
        </Box>



        {/* Network + Wallet - Responsive adjustments */}
        <Box display="flex" gap={isMobile ? 1 : 2} alignItems="center">
          <Button variant="outlined"
            size={isMobile ? 'small' : 'medium'}
            disabled={!isWalletConnected}
            onClick={createCycle}
            sx={{
              borderColor: 'rgba(125, 196, 255, 0.5)',
              color: '#000000',
              textTransform: 'none',
              backgroundColor: '#7DC4FF',
              fontSize: isMobile ? '0.7rem' : '0.875rem',
              cursor: isWalletConnected ? 'pointer' : 'not-allowed',
              px: isMobile ? 1 : 2
            }}>Create Cycle</Button>
          <Button onClick={updateCycle}>
            Update Phase
          </Button>
          <Button
            // onClick={async () => {
            //   const res = await finalizeCycle(cycleData);
            //   console.log("Finalize result:", res);
            //   await fetchCycle()
            //   toast.success(res.message);
            // }}
            onClick={async () => {
              const res = await finalizeCycle(cycleData);
              console.log("Finalize result:", res);
              await fetchCycle();
              toast.success(res.message);
            }}

          >
            Finalize token
          </Button>

          {!isMobile && ( // Hide network chip on mobile
            <Chip
              label="sepolia"
              size={isMobile ? 'small' : 'medium'}
              sx={{
                bgcolor: 'transparent',
                borderColor: '#7DC4FF',
                color: '#7DC4FF',
                fontSize: isMobile ? '0.7rem' : '0.8125rem'
              }}
              variant="outlined"
            />
          )}

          {isWalletConnected ? (
            <Button
              variant="outlined"
              size={isMobile ? 'small' : 'medium'}
              sx={{
                borderColor: 'rgba(125, 196, 255, 0.5)',
                color: '#E2E8F0',
                textTransform: 'none',
                fontSize: isMobile ? '0.7rem' : '0.875rem',
                px: isMobile ? 1 : 2
              }}
              onClick={disconnectWallet}
            >
              {formatAddress(walletAddress)}
            </Button>
          ) : (
            <Button
              variant="contained"
              size={isMobile ? 'small' : 'medium'}
              sx={{
                bgcolor: '#7DC4FF',
                color: '#0B1523',
                fontWeight: 600,
                '&:hover': { bgcolor: '#6cb4e5' },
                textTransform: 'none',
                fontSize: isMobile ? '0.7rem' : '0.875rem',
                px: isMobile ? 1.5 : 2
              }}
              onClick={connectWallet}
              startIcon={!isMobile && <Wallet size={isMobile ? 16 : 18} />} // Hide icon on mobile
            >
              {isMobile ? 'Connect' : 'Connect Wallet'}
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;