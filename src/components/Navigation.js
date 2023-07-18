import React from 'react'
import {Link} from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import { Tooltip, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material';
export default function Navigation() {
  const {user, logOut} = UserAuth();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
const handleSignOut = async ()=>{
  try {
    await logOut()
  } catch (error) {
    console.log(error);
  }
}
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div>
      <nav className='green'>
    <div className="nav-wrapper">
      <a href="#" className="brand-logo center">Fruity</a>
      <ul id="nav-mobile" className="left hide-on-med-and-down">
        <li to='/'><Link to='/'><i class="material-icons left">home</i>Home</Link></li>
        <li to='/About'><Link to='/About'><i class="material-icons left">info_outline</i>About</Link></li>
        <li to='/Contact'><Link to='/Contact'><i class="material-icons left">contacts</i>Contact</Link></li>
      </ul>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        {user?.displayName?(                <div>
                <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.email} src={user.photoURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
               <MenuItem  onClick={handleCloseUserMenu}>
                <Typography textAlign="center" ><Link to='/Dashboard' style={{textDecoration:"none"}}>Dashboard</Link></Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseUserMenu}>
                <Typography textAlign="center" ><Link to='/Cart' style={{textDecoration:"none"}}>Cart</Link></Typography>
                </MenuItem>
                <MenuItem>
                <Typography textAlign="center" onClick={handleSignOut}>Logout</Typography>
                </MenuItem>
            </Menu>
                </div>
              
):(<li to='/Login'><Link to='/Login'>Sign in</Link></li>)}
      </ul>
    </div>
  </nav>
    </div>
  )
}
