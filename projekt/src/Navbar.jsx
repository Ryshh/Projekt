import Stack from '@mui/material/Stack'
import React, { useState, useContext } from 'react'
import { UserContext } from './UserContext'
import Button from '@mui/material/Button'
import { AppContext } from './AppContext'
import { signOut } from 'firebase/auth'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

export default function Navbar() {
    const { loggedIn, userInfo, setUserInfo } = useContext(UserContext)
    const { auth, navigate, currentPage, darkMode, toggleDarkMode } = useContext(AppContext)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    async function signingOut() {
        handleCloseMenu();
        await signOut(auth)
        navigate("/")
        setUserInfo({})
    }

    const activeStyle = { color: "orange", cursor: "pointer" }
    const normalStyle = { cursor: "pointer" }

    return (
        <Stack 
            className='navbar' 
            position={'sticky'} 
            top={0} 
            zIndex={100} 
            direction="row" 
            alignItems="center" 
            height={80}
            justifyContent="space-between"
            px={3}
            sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}
        >
            <Breadcrumbs>
                <Typography 
                    onClick={() => navigate("/")} 
                    sx={currentPage === "home" ? activeStyle : normalStyle}
                >
                    HOME
                </Typography>
                {loggedIn && (
                    <Typography 
                        onClick={() => navigate("/messages")} 
                        sx={currentPage === "messages" ? activeStyle : normalStyle}
                    >
                        MESSAGES
                    </Typography>
                )}
            </Breadcrumbs>

            <Stack direction="row" alignItems="center" spacing={1}>
                {loggedIn ? (
                    <>
                        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                            <Avatar 
                                src={userInfo.userPic} 
                                sx={{ bgcolor: "primary.main", width: 45, height: 45 }}
                            >
                                {userInfo.username?.[0]?.toUpperCase() || <PersonIcon />}
                            </Avatar>
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleCloseMenu}
                            onClick={handleCloseMenu}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            PaperProps={{
                                elevation: 3,
                                sx: { mt: 1.5, minWidth: 200, borderRadius: 2 }
                            }}
                        >
                            <MenuItem disabled>
                                <Typography variant="body1" fontWeight="bold" color="text.primary">
                                    {userInfo.username}
                                </Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={() => navigate("/profile")}>
                                <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={(e) => { e.stopPropagation(); toggleDarkMode(); }}>
                                <ListItemIcon>
                                    {darkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                                </ListItemIcon>
                                {darkMode ? "Light Mode" : "Dark Mode"}
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={signingOut} sx={{ color: 'error.main' }}>
                                <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <>
                        <IconButton onClick={toggleDarkMode} color="inherit">
                            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>
                        <Button 
                            variant="contained" 
                            startIcon={<LoginIcon />}
                            onClick={() => navigate("/login")}
                            sx={{ borderRadius: '8px' }}
                        >
                            Login
                        </Button>
                    </>
                )}
            </Stack>
        </Stack>
    )
}