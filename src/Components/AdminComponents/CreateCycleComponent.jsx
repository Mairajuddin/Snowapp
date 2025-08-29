// import React, { useState } from 'react';
// import { Box, Typography, AppBar, Toolbar, Button, Card, CardContent, Grid, Paper, Chip, LinearProgress } from '@mui/material';
// import { TrendingUp, Refresh, Info, AccountBalance, Timeline, Settings } from '@mui/icons-material';


// const StakingComponent = () => {
//   return (
//     <Box sx={{ padding: '24px' }}>
//       <Typography variant="h4" component="h2" sx={{ mb: 4, color: '#fff', fontWeight: 600 }}>
//         Staking Dashboard
//       </Typography>

//       <Grid container spacing={3}>
//         {/* Staking Stats */}
//         <Grid item xs={12} md={4}>
//           <Card sx={{ 
//             background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
//             color: 'white',
//             boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
//           }}>
//             <CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <AccountBalance sx={{ mr: 1 }} />
//                 <Typography variant="h6">Total Staked</Typography>
//               </Box>
//               <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
//                 1,250,000
//               </Typography>
//               <Typography variant="body2" sx={{ opacity: 0.8 }}>
//                 USD Value: $2,500,000
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Card sx={{ 
//             background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
//             color: 'white',
//             boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
//           }}>
//             <CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <TrendingUp sx={{ mr: 1 }} />
//                 <Typography variant="h6">APY Rate</Typography>
//               </Box>
//               <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
//                 12.5%
//               </Typography>
//               <Typography variant="body2" sx={{ opacity: 0.8 }}>
//                 Annual Percentage Yield
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Card sx={{ 
//             background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
//             color: 'white',
//             boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
//           }}>
//             <CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                 <Refresh sx={{ mr: 1 }} />
//                 <Typography variant="h6">Rewards Earned</Typography>
//               </Box>
//               <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
//                 45,230
//               </Typography>
//               <Typography variant="body2" sx={{ opacity: 0.8 }}>
//                 This Month
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Staking Pool Information */}
//         <Grid item xs={12}>
//           <Paper sx={{ 
//             background: 'rgba(255, 255, 255, 0.05)',
//             backdropFilter: 'blur(10px)',
//             border: '1px solid rgba(255, 255, 255, 0.1)',
//             p: 3
//           }}>
//             <Typography variant="h5" sx={{ color: '#fff', mb: 3 }}>
//               Active Staking Pools
//             </Typography>
//             <Grid container spacing={2}>
//               {[
//                 { name: 'Main Pool', staked: '850K', apy: '12.5%', status: 'Active' },
//                 { name: 'High Yield Pool', staked: '300K', apy: '18.2%', status: 'Active' },
//                 { name: 'Stable Pool', staked: '100K', apy: '8.5%', status: 'Paused' }
//               ].map((pool, index) => (
//                 <Grid item xs={12} md={4} key={index}>
//                   <Card sx={{ 
//                     background: 'rgba(255, 255, 255, 0.08)',
//                     border: '1px solid rgba(255, 255, 255, 0.12)'
//                   }}>
//                     <CardContent>
//                       <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
//                         {pool.name}
//                       </Typography>
//                       <Typography sx={{ color: '#94a3b8', mb: 1 }}>
//                         Staked: {pool.staked}
//                       </Typography>
//                       <Typography sx={{ color: '#94a3b8', mb: 2 }}>
//                         APY: {pool.apy}
//                       </Typography>
//                       <Chip 
//                         label={pool.status}
//                         color={pool.status === 'Active' ? 'success' : 'warning'}
//                         size="small"
//                       />
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default StakingComponent;

// ------------------------------------------HELLO JANE-----------------------------------
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  InputAdornment
} from '@mui/material';
import {
  Schedule,
  Timer,
  Token,
  Send
} from '@mui/icons-material';
import { FireApi } from '../../hooks/useRequest';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

const CreateCycleComponent = () => {
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    startingTime: '',
    stakingDuration: '',
    claimDuration: '',
    tokenAddress: ''
  });

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setLoading(true)

  //   const startingTimeMs = new Date(formData.startingTime).getTime();

  //   const submitData = {
  //     startingTime: Math.floor(startingTimeMs / 1000),
  //     stakingDuration: parseInt(formData.stakingDuration) * 60,
  //     claimDuration: parseInt(formData.claimDuration) * 60,
  //     tokenAddress: '0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B',
  //     // formData.tokenAddress,
  //   };

  //   try {
  //     const response = await FireApi("admin/create-cycle", "POST", submitData);

  //     if (response?.success || response?.ok) {
  //       toast.success(response?.message || 'successfull')
  //       setLoading(false)

  //     } else {
  //       toast.error(response?.message || 'failed')
  //       setLoading(false)
  //       setFormData({
  //         startingTime: '',
  //         stakingDuration: '',
  //         claimDuration: '',
  //         tokenAddress: ''
  //       })
  //     }
  //   } catch (error) {
  //     setLoading(false)
  //     console.error("API call failed:", error);
  //   }

  //   console.log("Form Data:", submitData);
  // };

  const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);

  // Validation
  if (!formData.startingTime) {
    toast.error("Please select starting time");
    setLoading(false);
    return;
  }

  if (!formData.stakingDuration || isNaN(formData.stakingDuration) || parseInt(formData.stakingDuration) <= 0) {
    toast.error("Please enter a valid staking duration (in minutes)");
    setLoading(false);
    return;
  }

  if (!formData.claimDuration || isNaN(formData.claimDuration) || parseInt(formData.claimDuration) <= 0) {
    toast.error("Please enter a valid claim duration (in minutes)");
    setLoading(false);
    return;
  }



  const startingTimeMs = new Date(formData.startingTime).getTime();

  const submitData = {
    startingTime: Math.floor(startingTimeMs / 1000),
    stakingDuration: parseInt(formData.stakingDuration) * 60,
    claimDuration: parseInt(formData.claimDuration) * 60,
    tokenAddress: formData.tokenAddress || '0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B',
  };

  try {
    const response = await FireApi("admin/create-cycle", "POST", submitData);

    if (response?.success || response?.ok) {
      toast.success(response?.message || 'Cycle created successfully');
      setFormData({
        startingTime: '',
        stakingDuration: '',
        claimDuration: '',
        tokenAddress: ''
      });
    } else {
      toast.error(response?.message || 'Failed to create cycle');
    }
  } catch (error) {
    toast.error("API call failed");
    console.error("API call failed:", error);
  } finally {
    setLoading(false);
  }

  console.log("Form Data:", submitData);
};


  return (
    <Box sx={{
      padding: '24px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
    }}>
      <Typography variant="h4" component="h2" sx={{ mb: 4, color: '#fff', fontWeight: 600, textAlign: 'center' }}>
        Create Staking Cycle
      </Typography>

      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Card sx={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}>
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>


                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Starting Time"
                      type="datetime-local"
                      value={formData.startingTime}
                      onChange={handleInputChange('startingTime')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Schedule sx={{ color: '#64748b' }} />
                          </InputAdornment>
                        ),
                        sx: {
                          color: '#fff',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.23)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.4)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#3b82f6',
                          },
                        }
                      }}
                      InputLabelProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.7)' },
                        shrink: true
                      }}
                      helperText="Select date and time for staking to begin"
                      FormHelperTextProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.5)' }
                      }}
                    />
                  </Grid>



                  <Grid item xs={12}>
                    {/* <TextField
                      fullWidth
                      label="Staking Duration"
                      type="datetime-local"
                      value={formData.stakingDuration}
                      onChange={handleInputChange('stakingDuration')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Schedule sx={{ color: '#64748b' }} />
                          </InputAdornment>
                        ),
                        sx: {
                          color: '#fff',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.23)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.4)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#3b82f6',
                          },
                        }
                      }}
                      InputLabelProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.7)' },
                        shrink: true
                      }}
                      helperText="Select date and time for staking to begin"
                      FormHelperTextProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.5)' }
                      }}
                    /> */}
                    <TextField
                      fullWidth
                      label="Staking Duration (minutes)"
                      type="number"   // 👈 ab number input hoga
                      value={formData.stakingDuration}
                      onChange={handleInputChange("stakingDuration")}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Schedule sx={{ color: "#64748b" }} />
                          </InputAdornment>
                        ),
                        sx: {
                          color: "#fff",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(255, 255, 255, 0.23)",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(255, 255, 255, 0.4)",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#3b82f6",
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: { color: "rgba(255, 255, 255, 0.7)" },
                        shrink: true,
                      }}
                      helperText="Enter staking duration in minutes"   // 👈 updated text
                      FormHelperTextProps={{
                        sx: { color: "rgba(255, 255, 255, 0.5)" },
                      }}
                    />

                  </Grid>



                  <Grid item xs={12}>
                    {/* <TextField
                      fullWidth
                      label="Claim Duration "
                      type="datetime-local"
                      value={formData.claimDuration}
                      onChange={handleInputChange('claimDuration')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Schedule sx={{ color: '#64748b' }} />
                          </InputAdornment>
                        ),
                        sx: {
                          color: '#fff',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.23)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.4)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#3b82f6',
                          },
                        }
                      }}
                      InputLabelProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.7)' },
                        shrink: true
                      }}
                      helperText="Select date and time for staking to begin"
                      FormHelperTextProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.5)' }
                      }}
                    /> */}
                    <TextField
                      fullWidth
                      label="Claim Duration (mins)"
                      type="number"
                      value={formData.claimDuration}
                      onChange={handleInputChange('claimDuration')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Schedule sx={{ color: '#64748b' }} />
                          </InputAdornment>
                        ),
                        sx: {
                          color: '#fff',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.23)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.4)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#3b82f6',
                          },
                        }
                      }}
                      InputLabelProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.7)' },
                        shrink: true
                      }}
                      helperText="Enter duration in minutes"
                      FormHelperTextProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.5)' }
                      }}
                    />

                  </Grid>


                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Token Address"
                      type="text"
                      disabled
                      value={formData.tokenAddress}
                      onChange={handleInputChange('tokenAddress')}
                      placeholder="0xBd3CE885Ba6263a494bc363F9f77aF2Db0b68aA4"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Token sx={{ color: '#64748b' }} />
                          </InputAdornment>
                        ),
                        sx: {
                          color: '#fff',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.23)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.4)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#f59e0b',
                          },
                        }
                      }}
                      InputLabelProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.7)' }
                      }}
                      helperText="Enter valid contract address"
                      FormHelperTextProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.5)' }
                      }}
                    />
                  </Grid>


                  <Grid item xs={12}>
                    <Box sx={{ mt: 3, textAlign: 'center' }}>

                      {/* <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        disabled={loading}
                        startIcon={<Send />}
                        sx={{
                          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                          color: "white",
                          py: { xs: 0.4, sm: 0.6, md: 0.8 },
                          px: { xs: 1.5, sm: 2, md: 2.5 },
                          borderRadius: "10px",
                          fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                          fontWeight: 600,
                          textTransform: "none",
                          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                            boxShadow: "0 6px 16px rgba(59, 130, 246, 0.6)",
                            transform: "translateY(-1px)",
                          },
                          transition: "all 0.2s ease-in-out",
                        }}
                      >
                        Create Staking Cycle
                      </Button> */}
                      <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        disabled={loading}
                        startIcon={
                          loading ? (
                            <CircularProgress size={18} sx={{ color: "white" }} />
                          ) : (
                            <Send />
                          )
                        }
                        sx={{
                          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                          color: "white",
                          py: { xs: 0.4, sm: 0.6, md: 0.8 },
                          px: { xs: 1.5, sm: 2, md: 2.5 },
                          borderRadius: "10px",
                          fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                          fontWeight: 600,
                          textTransform: "none",
                          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                            boxShadow: "0 6px 16px rgba(59, 130, 246, 0.6)",
                            transform: "translateY(-1px)",
                          },
                          transition: "all 0.2s ease-in-out",
                        }}
                      >
                        {loading ? "Processing..." : "Create Staking Cycle"}
                      </Button>


                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateCycleComponent;
