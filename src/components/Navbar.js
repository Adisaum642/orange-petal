import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust this path to your logo

const pages = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <AppBar 
      position="static" 
      sx={{ background: "#e67626", boxShadow: 1 }}
      elevation={2}
    >
      <Toolbar>
        {/* Logo & Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <img src={logo} alt="Logo" height={44} style={{ marginRight: 10 }} />
          <Typography 
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
              letterSpacing: '.1rem'
            }}
          >
            Orange Petal
          </Typography>
        </Box>

        {/* Main navigation for md+ screens */}
        <Box sx={{  display: { xs: 'none', md: 'flex' }, ml: 'auto' ,}}>
          {pages.map((page) => (
            <Button
              key={page.to}
              component={Link}
              to={page.to}
              sx={{ color: '#fff', fontWeight: 'bold', mr: 2 }}
            >
              {page.label}
            </Button>
          ))}
        </Box>

        {/* Hamburger menu for xs/sm screens */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.to}
                component={Link}
                to={page.to}
                onClick={handleCloseNavMenu}
              >
                {page.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
