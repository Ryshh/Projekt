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

    const { user, loggedIn } = useContext(UserContext)
    const { auth, navigate } = useContext(AppContext)

    async function signingOut() {
        await signOut(auth)
        navigate("/")
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

            {loggedIn ? 
                <>
                <Typography fontSize={24} style={{ cursor: "pointer", marginLeft: "50px"}} onClick={() => navigate("/")}>
                    Home
                </Typography>
                </> : <>
                <Typography fontSize={24} style={{ cursor: "pointer", marginLeft: "50px"}} onClick={() => navigate("/messages")}>
                    Messages
                </Typography>
            </>}




            <div style={{flexGrow: 1}}></div>

            <Stack>
                {loggedIn ? 
                <>
                    <Button variant="text" onClick={signingOut} size='small' >Sign out</Button>
                </> : <>
                    <Button variant="text" onClick={() => navigate("/login")} size='small' >Sign in</Button>
                </>}
           </Stack>
        </Stack>
    )
}
