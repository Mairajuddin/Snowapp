
import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  TrendingUp, 
  Timeline, 
  Settings, 
  Menu as MenuIcon,
  Dashboard as DashboardIcon 
} from '@mui/icons-material';


import CreateCycleComponent from '../Components/AdminComponents/CreateCycleComponent';
import FinalizeCycleComponent from '../Components/AdminComponents/FinalizeCycleComponent';
import FinalizeUnclaimedTToken from '../Components/AdminComponents/FinalizeUnclaimedToken';
import AdminHome from '../Components/AdminComponents/AdminHome';

const drawerWidth = 280;

const AdminHomePage = () => {
  const [activeTab, setActiveTab] = useState('staking');
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { 
      key: 'adminhome', 
      label: 'Home', 
      icon: <TrendingUp />,
      description: 'Admin Home Page'
    },
    { 
      key: 'createCycle', 
      label: 'Create Cycle', 
      icon: <TrendingUp />,
      description: 'Create and manage new staking cycles'
    },
    { 
      key: 'finalizeCycle', 
      label: 'Finalize Cycle', 
      icon: <Timeline />,
      description: 'Close active cycles and track reward history'
    },
    { 
      key: 'unClaimedTOkens', 
      label: 'Finalize Unclaimed Tokens', 
      icon: <Settings />,
      description: 'View and finalize unclaimed staking rewards'
    }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'adminhome':return <AdminHome/>;
      case 'createCycle': return <CreateCycleComponent />;
      case 'finalizeCycle': return <FinalizeCycleComponent />;
      case 'unClaimedTOkens': return <FinalizeUnclaimedTToken />;
      default: return <AdminHome />;
    }
  };

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(180deg, #0B1523 0%, #1a2332 50%, #2a3441 100%)',
    
  
    }}>
      {/* Sidebar Header */}
      <Box sx={{ 
        p: 3, 
        background: 'linear-gradient(135deg, #0B1523 0%, #1a2332 100%)',
        color: 'white'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <DashboardIcon sx={{ mr: 2, fontSize: 32 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Admin Panel
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Comprehensive dashboard for system management
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      {/* Navigation Menu */}
      <List sx={{ flex: 1, px: 2, py: 3 }}>
        {menuItems.map((item) => (
          <ListItem key={item.key} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              selected={activeTab === item.key}
              onClick={() => {
                setActiveTab(item.key);
                if (isMobile) {
                  setMobileOpen(false);
                }
              }}
              sx={{
                borderRadius: 2,
                py: 2,
                px: 2,
                minHeight: 64,
                color: 'rgba(255, 255, 255, 0.8)',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(59, 130, 246, 0.15)',
                  color: '#60a5fa',
                  boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: '#60a5fa',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                secondary={item.description}
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                  fontWeight: activeTab === item.key ? 600 : 400,
                  color: activeTab === item.key ? '#60a5fa' : 'rgba(255, 255, 255, 0.9)',
                }}
                secondaryTypographyProps={{
                  fontSize: '0.8rem',
                  color: activeTab === item.key ? 'rgba(96, 165, 250, 0.7)' : 'rgba(255, 255, 255, 0.6)',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      {/* Footer */}
     
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          background: 'rgba(11, 21, 35, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          border: 'none',
          color: 'white',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ 
            fontWeight: 600,
            color: 'white',
            flex: 1
          }}>
            {menuItems.find(item => item.key === activeTab)?.label || 'Dashboard'}
          </Typography>

          {/* Optional: Add user profile or notifications here */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1
          }}>
            <Box sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              mr: 1
            }} />
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Live
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              background: 'linear-gradient(180deg, #0B1523 0%, #1a2332 50%, #2a3441 100%)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              background: 'linear-gradient(180deg, #0B1523 0%, #1a2332 50%, #2a3441 100%)',
              border: 'none',
              boxShadow: '2px 0 20px rgba(0,0,0,0.3)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs:'100%',md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0B1523 0%, #1a2332 30%, #2a3441 70%, #3a4450 100%)',
        }}
      >
        <Toolbar />
        
        {/* Content Area */}
        <Box sx={{ 
          p: { xs: 2, sm: 3, md: 4 },
          background: 'transparent'
        }}>
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminHomePage;