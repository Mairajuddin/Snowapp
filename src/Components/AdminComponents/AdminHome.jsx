import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Paper, Chip, LinearProgress, Tooltip, CircularProgress } from '@mui/material';
import { TrendingUp, Refresh, Info, AccountBalance, Timeline, Settings } from '@mui/icons-material';
import { FireApi } from '../../hooks/useRequest';
import TimeDisplay from '../TimeDuration';
import CountdownTimer from '../CountdownTimer';


const AdminHome = () => {
    const [info, setInfo] = useState()
    const [loading, setLoading] = useState(false)
    const handleGetInfo = async () => {
        setLoading(true)
        try {
            const response = await FireApi("get-cycle-info", "GET");

            if (response?.success || response?.ok) {
                // toast.success(response?.message || 'successfull')
                setInfo(response?.data)
                setLoading(false)

            } else {
                setLoading(false)
                // toast.error(response?.message || 'failed')
            }
        } catch (error) {
            setLoading(false)

            console.error("API call failed:", error);
        }

      
    };

    useEffect(() => {
        handleGetInfo();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <CircularProgress />
            </Box>
        );
    }


    return (
        <Box sx={{ padding: '24px' }}>
            <Typography variant="h4" component="h2" sx={{ mb: 4, color: '#fff', fontWeight: 600 }}>
                Staking Dashboard
            </Typography>

            <Grid container spacing={3}>
                {/* Staking Stats */}
                <Grid item xs={12} md={4}>
                    <Card sx={{
                        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                        color: 'white',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                    }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <AccountBalance sx={{ mr: 1 }} />
                                <Typography variant="h6">Total Staked</Typography>
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                {info?.totalStaked || '0'}
                            </Typography>
                            {/* <Typography variant="body2" sx={{ opacity: 0.8 }}>
                USD Value: $2,500,000
              </Typography> */}
                        </CardContent>
                    </Card>
                </Grid>


                <Grid item xs={12} md={4}>
                    <Card sx={{
                        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                        color: 'white',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                    }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <TrendingUp sx={{ mr: 1 }} />
                                <Typography variant="h6">Current Cycle  </Typography>
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                {info?.cycle}
                            </Typography>
                            {/* <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Annual Percentage Yield
              </Typography> */}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{
                        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                        color: 'white',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                    }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Refresh sx={{ mr: 1 }} />
                                <Typography variant="h6">Phase</Typography>
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                {info?.cycleEnded ? "Ended":info?.phase}{/* {info?.phase} */}
                            </Typography>
                            {/* <Typography variant="body2" sx={{ opacity: 0.8 }}>
                This Month
              </Typography> */}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        p: 3
                    }}>
                        <Typography variant="h5" sx={{ color: '#fff', mb: 3 }}>
                            Details
                        </Typography>
                        <Grid container spacing={2}>
                            {/* Previous TOken */}
                            <Grid item xs={12} md={4}>
                                <Card sx={{
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    border: '1px solid rgba(255, 255, 255, 0.12)'
                                }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                                            Previous Token
                                        </Typography>
                                        <Tooltip title={info?.previoustoken || ""}>
                                            <Typography sx={{ color: "#94a3b8", mb: 1, cursor: "pointer" }}>
                                                {info?.previoustoken
                                                    ? info.previoustoken.substring(0, 15) + (info.previoustoken.length > 15 ? "..." : "")
                                                    : ""}
                                            </Typography>
                                        </Tooltip>

                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Stake Token */}
                            <Grid item xs={12} md={4}>
                                <Card sx={{
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    border: '1px solid rgba(255, 255, 255, 0.12)'
                                }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                                            Stake Token
                                        </Typography>
                                        <Tooltip title={info?.stakedToken || ""}>
                                            <Typography sx={{ color: "#94a3b8", mb: 1, cursor: "pointer" }}>
                                                {info?.stakedToken
                                                    ? info.stakedToken.substring(0, 15) + (info.stakedToken.length > 15 ? "..." : "")
                                                    : ""}
                                            </Typography>
                                        </Tooltip>
                                        {/* <Typography sx={{ color: '#94a3b8', mb: 2 }}>
                                            APY: 18.2%
                                        </Typography> */}

                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Reward Token */}
                            <Grid item xs={12} md={4}>
                                <Card sx={{
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    border: '1px solid rgba(255, 255, 255, 0.12)'
                                }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                                            Reward Token
                                        </Typography>
                                        <Tooltip title={info?.rewardToken || ""}>
                                            <Typography sx={{ color: "#94a3b8", mb: 1, cursor: "pointer" }}>
                                                {info?.rewardToken
                                                    ? info.rewardToken.substring(0, 15) + (info.rewardToken.length > 15 ? "..." : "")
                                                    : ""}
                                            </Typography>
                                        </Tooltip>

                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card sx={{
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    border: '1px solid rgba(255, 255, 255, 0.12)'
                                }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                                            Token Version
                                        </Typography>
                                        <Tooltip title={info?.tokenVersionAddress || ""}>
                                            <Typography sx={{ color: "#94a3b8", mb: 1, cursor: "pointer" }}>
                                                {info?.tokenVersionAddress
                                                    ? info.tokenVersionAddress.substring(0, 15) + (info.tokenVersionAddress.length > 15 ? "..." : "")
                                                    : ""}
                                            </Typography>
                                        </Tooltip>

                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>


                    </Paper>
                </Grid>
                {/* -----------------------------------------duration------------- */}
            </Grid>
            <Grid item xs={12} md={4}>
                <Box
                    sx={{
                        background: "none",
                        color: "white",
                        p: 2, // padding for spacing
                        borderRadius: 2, // thoda rounded look agar chaho
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6">Time Stamps</Typography>
                    </Box>

                    {/* <TimeDisplay seconds={info?.startTimestamp} label="Start" />
                    <TimeDisplay seconds={info?.stakingEnd} label="Staking End" />
                    <TimeDisplay seconds={info?.claimEnd} label="Claim End" /> */}
                     {/* <CountdownTimer targetTimestamp={info?.startTimestamp}  label='Start Staking'/> */}
                      <CountdownTimer targetTimestamp={info?.stakingEnd} label='Staking End'/>
                          <CountdownTimer targetTimestamp={info?.claimEnd}  label='Claim End'/>

                </Box>
            </Grid>

        </Box>
    );
};

export default AdminHome;

