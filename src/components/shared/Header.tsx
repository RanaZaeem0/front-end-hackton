import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Server } from '../../constants/config';
import axios from 'axios';
import { handleApiError } from '../../lib/features';
import { useNavigate } from 'react-router-dom';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const router = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = ()=>{

    axios.post(`${Server}user/logout`,
      {}, {
      withCredentials: true
  }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
          window.location.reload()
      }else{
        handleApiError(res)
      }
  }).catch((error:any) => {
      console.log("error",error);
  })
  }
  
  return (
    <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        LoanCare
      </Typography>
      <Button color="inherit">Home</Button>
      <Button color="inherit">Services</Button>
      <Button color="inherit" onClick={()=>router('/dashboard')}>Dashboard</Button>
      <Button color="inherit" onClick={()=>router('/admin/login')}>admin</Button>
    </Toolbar>
  </AppBar>
  );
}
export default ResponsiveAppBar;
