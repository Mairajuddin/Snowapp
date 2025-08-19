import React, { useState } from 'react';
import { Box, Typography, AppBar, Toolbar, Button, Card, CardContent, Grid, Paper, Chip, LinearProgress } from '@mui/material';
import { TrendingUp, Refresh, Info, AccountBalance, Timeline, Settings } from '@mui/icons-material';


const StakingComponent = () => {
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
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                1,250,000
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                USD Value: $2,500,000
              </Typography>
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
                <Typography variant="h6">APY Rate</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                12.5%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Annual Percentage Yield
              </Typography>
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
                <Typography variant="h6">Rewards Earned</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                45,230
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                This Month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Staking Pool Information */}
        <Grid item xs={12}>
          <Paper sx={{ 
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            p: 3
          }}>
            <Typography variant="h5" sx={{ color: '#fff', mb: 3 }}>
              Active Staking Pools
            </Typography>
            <Grid container spacing={2}>
              {[
                { name: 'Main Pool', staked: '850K', apy: '12.5%', status: 'Active' },
                { name: 'High Yield Pool', staked: '300K', apy: '18.2%', status: 'Active' },
                { name: 'Stable Pool', staked: '100K', apy: '8.5%', status: 'Paused' }
              ].map((pool, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ 
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)'
                  }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                        {pool.name}
                      </Typography>
                      <Typography sx={{ color: '#94a3b8', mb: 1 }}>
                        Staked: {pool.staked}
                      </Typography>
                      <Typography sx={{ color: '#94a3b8', mb: 2 }}>
                        APY: {pool.apy}
                      </Typography>
                      <Chip 
                        label={pool.status}
                        color={pool.status === 'Active' ? 'success' : 'warning'}
                        size="small"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StakingComponent;