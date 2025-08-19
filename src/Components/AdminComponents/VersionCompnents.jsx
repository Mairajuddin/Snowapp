import React, { useState } from 'react';
import { Box, Typography, AppBar, Toolbar, Button, Card, CardContent, Grid, Paper, Chip, LinearProgress } from '@mui/material';
import { TrendingUp, Refresh, Info, AccountBalance, Timeline, Settings } from '@mui/icons-material';

const VersionComponents = () => {
  return (
    <Box sx={{ padding: '24px' }}>
      <Typography variant="h4" component="h2" sx={{ mb: 4, color: '#fff', fontWeight: 600 }}>
        Version Information
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#fff', mb: 3 }}>
                Current System Version
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ color: '#10b981', fontWeight: 'bold', mb: 1 }}>
                  v2.4.1
                </Typography>
                <Typography sx={{ color: '#94a3b8' }}>
                  Released on March 15, 2025
                </Typography>
              </Box>

              <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                Latest Updates
              </Typography>
              
              {[
                { version: 'v2.4.1', date: 'Mar 15, 2025', type: 'Patch', description: 'Bug fixes and performance improvements' },
                { version: 'v2.4.0', date: 'Mar 1, 2025', type: 'Minor', description: 'New staking pool features and UI enhancements' },
                { version: 'v2.3.2', date: 'Feb 20, 2025', type: 'Patch', description: 'Security updates and stability fixes' },
                { version: 'v2.3.0', date: 'Feb 1, 2025', type: 'Minor', description: 'Cycle management improvements' }
              ].map((version, index) => (
                <Box key={index} sx={{ 
                  mb: 2,
                  p: 2,
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 2,
                  borderLeft: '4px solid #10b981'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: '#fff', fontWeight: 'bold' }}>
                      {version.version}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip 
                        label={version.type}
                        size="small"
                        color={version.type === 'Minor' ? 'primary' : 'default'}
                      />
                      <Typography sx={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                        {version.date}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ color: '#94a3b8' }}>
                    {version.description}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ 
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#fff', mb: 3 }}>
                System Health
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ color: '#94a3b8', mb: 1 }}>
                  Uptime
                </Typography>
                <Typography variant="h5" sx={{ color: '#10b981', fontWeight: 'bold' }}>
                  99.98%
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography sx={{ color: '#94a3b8', mb: 1 }}>
                  Last Deployment
                </Typography>
                <Typography sx={{ color: '#fff' }}>
                  2 days ago
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ color: '#94a3b8', mb: 1 }}>
                  Environment
                </Typography>
                <Chip 
                  label="Production"
                  color="success"
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VersionComponents;