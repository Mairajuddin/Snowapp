import React, { useState } from 'react';
import { Box, Typography, AppBar, Toolbar, Button, Card, CardContent, Grid, Paper, Chip, LinearProgress } from '@mui/material';
import { TrendingUp, Refresh, Info, AccountBalance, Timeline, Settings } from '@mui/icons-material';


const CycleComponent = () => {
  return (
    <Box sx={{ padding: '24px' }}>
      <Typography variant="h4" component="h2" sx={{ mb: 4, color: '#fff', fontWeight: 600 }}>
        Cycle Management
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#fff', mb: 3 }}>
                Current Cycle Status
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ color: '#94a3b8', mb: 1 }}>
                  Cycle #42 - Progress
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={75} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #10b981, #059669)'
                    }
                  }} 
                />
                <Typography sx={{ color: '#94a3b8', mt: 1, fontSize: '0.875rem' }}>
                  75% Complete (18 days remaining)
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Box>
                  <Typography sx={{ color: '#10b981', fontWeight: 'bold' }}>
                    2,450
                  </Typography>
                  <Typography sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                    Participants
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: '#f59e0b', fontWeight: 'bold' }}>
                    95.2%
                  </Typography>
                  <Typography sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                    Success Rate
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ 
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#fff', mb: 3 }}>
                Cycle History
              </Typography>
              {[
                { cycle: 41, status: 'Completed', rewards: '125K', participants: 2301 },
                { cycle: 40, status: 'Completed', rewards: '118K', participants: 2180 },
                { cycle: 39, status: 'Completed', rewards: '132K', participants: 2455 }
              ].map((item, index) => (
                <Box key={index} sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 2,
                  p: 2,
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 2
                }}>
                  <Box>
                    <Typography sx={{ color: '#fff' }}>Cycle #{item.cycle}</Typography>
                    <Typography sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                      {item.participants} participants
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Chip 
                      label={item.status}
                      color="success"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography sx={{ color: '#10b981', fontSize: '0.875rem' }}>
                      {item.rewards} rewards
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CycleComponent;