import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box sx={{ py: 2, borderTop: '1px solid #1E293B', textAlign: 'center' }}>
    <Typography variant="body2" sx={{ color: '#94A3B8' }}>
      © 2025 CYCLX DAO · GitHub · Docs
    </Typography>
  </Box>
);

export default Footer;
