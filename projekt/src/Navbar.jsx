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
        <Stack className='navbar' display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'center'} height={80} p={1.5} border={1} borderColor={'black'}>
            <Avatar
                src="/icon.png"
                sx={{ width: 80, height: 80 }}
            ></Avatar>
            <Typography fontSize={24}>
                AppName
            </Typography>

            <Breadcrumbs style={{ marginLeft: "50px"}}>
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

            <div style={{flexGrow: 1}}></div>
            {loggedIn ?
            <>
                <Avatar src={userInfo.profilePic} sx={{ bgcolor: "gray", padding: 1, marginRight: 1   }}></Avatar>
                <Typography>
                    {userInfo.username}
                </Typography>
            </> : <>    

            </>}

            <Stack marginLeft={5}>
                {currentPage != "login" ? 
                    <>{loggedIn ? 
                    <>
                        <Button variant="contained" style={{borderRadius: "15px"}} onClick={signingOut} size='small' >Sign out</Button>
                    </> : <>
                        <Button variant="contained" style={{borderRadius: "15px"}} onClick={() => navigate("/login")} size='small' >Sign in</Button>
                    </>}
                    </> : <>
                
                </>}
           </Stack>
        </Stack>
    )
}
