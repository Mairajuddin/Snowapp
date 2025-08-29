
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
  Badge,
  Token,
  Inventory,
  RocketLaunch
} from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

import { FireApi } from '../../hooks/useRequest';
import { toast } from 'react-toastify';

const FinalizeCycleComponent = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    initialSupply: ''
  });

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);

  // validation rules
  if (!formData.name.trim()) {
    toast.error("Name is required");
    setLoading(false);
    return;
  }

  if (!formData.symbol.trim()) {
    toast.error("Symbol is required");
    setLoading(false);
    return;
  }


  const submitData = {
    name: formData.name.trim(),
    symbol: formData.symbol.toUpperCase(),
  };

  try {
    const response = await FireApi("admin/create-token", "POST", submitData);

    if (response?.success || response?.ok) {
      toast.success(response?.message || "Successful");
      setFormData({ name: "", symbol: "" });
    } else {
      toast.error(response?.message || "Failed");
      setFormData({ name: "", symbol: "" });
    }
  } catch (error) {
    console.error("API call failed:", error);
    toast.error("Something went wrong, please try again");
  } finally {
    setLoading(false);
  }

  console.log("Form Data:", submitData);
};


  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setLoading(true)

  //   const submitData = {
  //     name: formData.name,
  //     symbol: formData.symbol.toUpperCase(),
  //     //   initialSupply: formData.initialSupply


  //   };
  //   try {
  //     const response = await FireApi("admin/create-token", "POST", submitData);

  //     if (response?.success || response?.ok) {
  //       toast.success(response?.message || 'successfull')
  //       setLoading(false)
  //       setFormData({
  //         name: '',
  //         symbol: '',

  //       });
  //     } else {
  //       toast.error(response?.message || 'failed')
  //       setLoading(false)
  //       setFormData({
  //         name: '',
  //         symbol: '',

  //       });
  //     }
  //   } catch (error) {
  //     setLoading(false)
  //     console.error("API call failed:", error);
  //   }

  //   console.log("Form Data:", submitData);
  // };

  return (
    <Box sx={{
      padding: '24px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
    }}>
      <Typography variant="h4" component="h2" sx={{ mb: 4, color: '#fff', fontWeight: 600, textAlign: 'center' }}>
        Finalize Cycle
      </Typography>

      <Grid container justifyContent="center">
        <Grid item xs={11} sm={10} md={8} lg={6}>
          <Card sx={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: { xs: '12px', sm: '16px' },
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            mx: { xs: 1, sm: 0 },
            // width:'100%'

          }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={{ xs: 2, sm: 3 }}>
                  {/* Token Name Field */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Token Name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange('name')}
                      placeholder="Reward"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Badge sx={{ color: '#64748b' }} />
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
                        sx: { color: 'rgba(255, 255, 255, 0.7)' }
                      }}
                      helperText="Enter the full name of your reward token"
                      FormHelperTextProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.5)' }
                      }}
                    />
                  </Grid>

                  {/* Token Symbol Field */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Token Symbol"
                      type="text"
                      value={formData.symbol}
                      onChange={handleInputChange('symbol')}
                      placeholder="RWD"
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
                            borderColor: '#10b981',
                          },
                        }
                      }}
                      InputLabelProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.7)' }
                      }}
                      helperText="3-5 characters (e.g., RWD)"
                      FormHelperTextProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.5)' }
                      }}
                    />
                  </Grid>

                  {/* Initial Supply Field */}
                  {/* <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Initial Supply"
                      type="number"
                      value={formData.initialSupply}
                      onChange={handleInputChange('initialSupply')}
                      placeholder="1000"
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
                      helperText="Total tokens to mint"
                      FormHelperTextProps={{
                        sx: { color: 'rgba(255, 255, 255, 0.5)' }
                      }}
                    />
                  </Grid> */}

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Box sx={{ mt: { xs: 2, sm: 3 }, textAlign: 'center' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="small"

                        fullWidth={false}
                        disabled={loading}
                        startIcon={
                          loading ? (
                            <CircularProgress size={18} sx={{ color: "white" }} />
                          ) : (
                            <RocketLaunch />
                          )
                        }
                        sx={{
                          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                          color: 'white',
                          py: { xs: 0.6, sm: 0.8 },
                          px: 2,
                          borderRadius: '10px',
                          fontSize: { xs: '0.85rem', sm: '0.95rem' },
                          fontWeight: 600,
                          textTransform: 'none',
                          boxShadow: '0 4px 12px rgba(5, 150, 105, 0.4)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
                            boxShadow: '0 6px 16px rgba(5, 150, 105, 0.6)',
                            transform: 'translateY(-1px)'
                          },
                          transition: 'all 0.2s ease-in-out'
                        }}
                      >
                        {loading ? "Processing..." : "Finalize Cycle"}

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

export default FinalizeCycleComponent;