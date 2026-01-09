import Stack from '@mui/material/Stack'
import React from 'react'
import { UserContext } from './UserContext'
import { useContext } from 'react'
import Button from '@mui/material/Button'
import { AppContext } from './AppContext'
import { signOut } from 'firebase/auth'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {

    const { user, loggedIn, userInfo, setUserInfo } = useContext(UserContext)
    const { auth, navigate, currentPage } = useContext(AppContext)

    async function signingOut() {
        await signOut(auth)
        navigate("/")

        setUserInfo({})
    }

    const color = {
        color: "orange",
        cursor: "pointer"
    }

    const pointer = {
        cursor: "pointer"
    }

    return (
        <Stack className='navbar' bgcolor={'#fff'} position={'sticky'} top={0} left={0} zIndex={100} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} height={80} p={1.5} border={1} borderColor={'black'} >
            <Avatar
                src="/PingMe.png"
                sx={{ width: 64, height: 64, display: { xs: 'none', sm: 'block' }, ml: 1 }}
            ></Avatar>
            <Typography sx={{ display: { xs: 'none', md: 'block' }, ml: 1 }} fontSize={24}>
                PingMe
            </Typography>

            <Stack width={"100%"} display={'flex'} justifyContent={'center'} alignItems={'center'} >
                <Breadcrumbs style={{ marginLeft: "10px"}}>
                    <Typography fontSize={24} style={currentPage == "home" ? color : pointer} onClick={() => navigate("/")}>
                        Home
                    </Typography>
                    {loggedIn ?
                        <Typography fontSize={24} style={currentPage == "messages" ? color : pointer} onClick={() => navigate("/messages")}>
                            Messages
                        </Typography>
                    :
                        <Typography fontSize={24} style={currentPage == "messages" ? color : pointer} onClick={() => navigate("/login")}>
                            Messages
                        </Typography>
                    }
                </Breadcrumbs>           
            </Stack>

            <div style={{flexGrow: 1}}></div>
            {loggedIn ?
            <>
                <Avatar src={userInfo.userPic} sx={{ bgcolor: "gray", padding: 1, marginRight: 1, width: 38, height: 38}}></Avatar>
                <Typography sx={{ display: { xs: 'none', md: 'block' }, ml: 1 }} fontSize={28} fontWeight={500}>
                    {userInfo.username} 
                </Typography>
            </> : <>    

            </>}

            <Stack marginLeft={2}>
                {currentPage != "login" ? 
                    <>{loggedIn ? 
                    <>
                        <Button variant="contained" style={{borderRadius: "15px"}} onClick={signingOut} size='small' ><LogoutIcon /></Button>
                    </> : <>
                        <Button variant="contained" style={{borderRadius: "15px"}} onClick={() => navigate("/login")} size='small' ><LoginIcon /></Button>
                    </>}
                    </> : <>
                
                </>}
           </Stack>
        </Stack>
    )
}
