// import React, { useState } from 'react';
// import { Box, Typography, AppBar, Toolbar, Button, Card, CardContent, Grid, Paper, Chip, LinearProgress } from '@mui/material';
// import { TrendingUp, Refresh, Info, AccountBalance, Timeline, Settings } from '@mui/icons-material';

// const FinalizeUnclaimedTToken = () => {
//   return (
//     <Box sx={{ padding: '24px' }}>
//       <Typography variant="h4" component="h2" sx={{ mb: 4, color: '#fff', fontWeight: 600 }}>
//         Version Information
//       </Typography>

//       <Grid container spacing={3}>
//         <Grid item xs={12} md={8}>
//           <Card sx={{ 
//             background: 'rgba(255, 255, 255, 0.05)',
//             backdropFilter: 'blur(10px)',
//             border: '1px solid rgba(255, 255, 255, 0.1)'
//           }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ color: '#fff', mb: 3 }}>
//                 Current System Version
//               </Typography>

//               <Box sx={{ mb: 4 }}>
//                 <Typography variant="h3" sx={{ color: '#10b981', fontWeight: 'bold', mb: 1 }}>
//                   v2.4.1
//                 </Typography>
//                 <Typography sx={{ color: '#94a3b8' }}>
//                   Released on March 15, 2025
//                 </Typography>
//               </Box>

//               <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
//                 Latest Updates
//               </Typography>

//               {[
//                 { version: 'v2.4.1', date: 'Mar 15, 2025', type: 'Patch', description: 'Bug fixes and performance improvements' },
//                 { version: 'v2.4.0', date: 'Mar 1, 2025', type: 'Minor', description: 'New staking pool features and UI enhancements' },
//                 { version: 'v2.3.2', date: 'Feb 20, 2025', type: 'Patch', description: 'Security updates and stability fixes' },
//                 { version: 'v2.3.0', date: 'Feb 1, 2025', type: 'Minor', description: 'Cycle management improvements' }
//               ].map((version, index) => (
//                 <Box key={index} sx={{ 
//                   mb: 2,
//                   p: 2,
//                   background: 'rgba(255, 255, 255, 0.03)',
//                   borderRadius: 2,
//                   borderLeft: '4px solid #10b981'
//                 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
//                     <Typography sx={{ color: '#fff', fontWeight: 'bold' }}>
//                       {version.version}
//                     </Typography>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <Chip 
//                         label={version.type}
//                         size="small"
//                         color={version.type === 'Minor' ? 'primary' : 'default'}
//                       />
//                       <Typography sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>
//                         {version.date}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Typography sx={{ color: '#94a3b8' }}>
//                     {version.description}
//                   </Typography>
//                 </Box>
//               ))}
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Card sx={{ 
//             background: 'rgba(255, 255, 255, 0.05)',
//             backdropFilter: 'blur(10px)',
//             border: '1px solid rgba(255, 255, 255, 0.1)'
//           }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ color: '#fff', mb: 3 }}>
//                 System Health
//               </Typography>

//               <Box sx={{ mb: 3 }}>
//                 <Typography sx={{ color: '#94a3b8', mb: 1 }}>
//                   Uptime
//                 </Typography>
//                 <Typography variant="h5" sx={{ color: '#10b981', fontWeight: 'bold' }}>
//                   99.98%
//                 </Typography>
//               </Box>

//               <Box sx={{ mb: 3 }}>
//                 <Typography sx={{ color: '#94a3b8', mb: 1 }}>
//                   Last Deployment
//                 </Typography>
//                 <Typography sx={{ color: '#fff' }}>
//                   2 days ago
//                 </Typography>
//               </Box>

//               <Box>
//                 <Typography sx={{ color: '#94a3b8', mb: 1 }}>
//                   Environment
//                 </Typography>
//                 <Chip 
//                   label="Production"
//                   color="success"
//                   size="small"
//                 />
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default FinalizeUnclaimedTToken;
// --------------------------ABOVE IS VERSION CONTROL------------------------
// --------------------------BELOW IS CLAIM TOKEN-------------------------
import React, { useState } from 'react';
import { Box, Typography, AppBar, Toolbar, Button, Card, CardContent, Grid, Paper, Chip, LinearProgress, TextField, InputAdornment } from '@mui/material';
import { TrendingUp, Refresh, Info, AccountBalance, Timeline, Settings } from '@mui/icons-material';
import {
  Badge,
  Token,
  Inventory,
  RocketLaunch
} from '@mui/icons-material';
import { FireApi } from '../../hooks/useRequest';
import { toast } from 'react-toastify';

const FinalizeUnclaimedTToken = () => {
  const [formData, setFormData] = useState({
    recipient: ''
  });

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  // const submitData = {
  //   recipient: formData.recipient
  // };

  //   console.log('Finalize Cycle Data:', submitData);
  // };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const submitData = {
      // recipient: formData.recipient
    };

    try {
      const response = await FireApi("admin/collect-unclaimed-tokens", "POST", submitData);

      if (response?.success || response?.ok) {
        console.log(response, "its working");
        toast.success(response?.message || 'successfull')
        setFormData({
          recipient: ''
        });
      } else {
        toast.error(response?.message || 'Failed')
        setFormData({
          recipient: ''
        });

      }
    } catch (error) {
      console.error("API call failed:", error);
    }

    console.log("Form Data:", submitData);
  };
  return (
    <Box sx={{ padding: '24px' }}>
      <Typography variant="h4" component="h2" sx={{ mb: 4, color: '#fff', fontWeight: 600 }}>
        Collect Token
      </Typography>
      {/* <Grid item xs={11} sm={10} md={8} lg={6}>
        <Card sx={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: { xs: '12px', sm: '16px' },
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          mx: { xs: 1, sm: 0 },
         

        }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <form onSubmit={handleSubmit}>

              <Grid
                container
                spacing={{ xs: 2, sm: 3 }}
                sx={{ mt: { xs: 1, sm: 2, md: 3 } }}
              >
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Wallet Address"
                    type="text"
                    value={formData.recipient}
                    onChange={handleInputChange('recipient')}
                    placeholder="0xBd3CE885Ba6263a494bc363F9f77aF2Db0b68aA4"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Inventory sx={{ color: '#64748b' }} />
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
                          borderColor: '#a855f7',
                        },
                      }
                    }}
                    InputLabelProps={{
                      sx: { color: 'rgba(255, 255, 255, 0.7)' }
                    }}
                    helperText="Enter recipient wallet address"
                    FormHelperTextProps={{
                      sx: { color: 'rgba(255, 255, 255, 0.5)' }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ textAlign: "center" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<RocketLaunch />}
                      fullWidth
                      sx={{
                        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                        color: "white",
                        py: { xs: 0.7, sm: 0.9, md: 1.1 }, // responsive height
                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" }, // responsive text
                        borderRadius: "10px",
                        fontWeight: 500,
                        textTransform: "none",
                        boxShadow: "0 3px 8px rgba(16, 185, 129, 0.3)",
                        "&:hover": {
                          background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                          boxShadow: "0 4px 12px rgba(16, 185, 129, 0.45)",
                          transform: "translateY(-1px)",
                        },
                        transition: "all 0.25s ease-in-out",
                      }}
                    >
                      Claim Token
                    </Button>
                  </Box>
                </Grid>
              </Grid>


            </form>
          </CardContent>
        </Card>
      </Grid> */}
      <Grid item xs={11} sm={10} md={8} lg={6}>
        <Card
          sx={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: { xs: "12px", sm: "16px" },
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            mx: { xs: 1, sm: 0 },
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={{ xs: 2, sm: 3 }}
                sx={{
                  mt: { xs: 1, sm: 2, md: 3 },
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "space-between" }, // xs=column center, md=space-between row
                  flexDirection: { xs: "column", md: "row" }, // mobile = column, desktop = row
                }}
              >

                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    label="Wallet Address"
                    type="text"
                    value={formData.recipient}
                    onChange={handleInputChange("recipient")}
                    placeholder="0xBd3CE885Ba6263a494bc363F9f77aF2Db0b68aA4"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Inventory sx={{ color: "#64748b" }} />
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
                          borderColor: "#a855f7",
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: { color: "rgba(255, 255, 255, 0.7)" },
                    }}
                    helperText="Enter recipient wallet address"
                    FormHelperTextProps={{
                      sx: { color: "rgba(255, 255, 255, 0.5)" },
                    }}
                  />
                </Grid>


                <Grid
                  item
                  xs={12}
                  md="auto"
                  sx={{
                    mt: { xs: 2, md: 0 }, // mobile pe neeche space
                    width: { xs: "100%", md: "auto" }, // mobile full width, desktop auto
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<RocketLaunch />}
                    fullWidth
                    sx={{
                      background:
                        "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      color: "white",
                      py: { xs: 0.7, sm: 0.9, md: 1.1 },
                      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                      borderRadius: "10px",
                      fontWeight: 500,
                      textTransform: "none",
                      boxShadow: "0 3px 8px rgba(16, 185, 129, 0.3)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #059669 0%, #047857 100%)",
                        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.45)",
                        transform: "translateY(-1px)",
                      },
                      transition: "all 0.25s ease-in-out",
                    }}
                  >
                    Claim Token
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>


    </Box>
  );
};

export default FinalizeUnclaimedTToken;