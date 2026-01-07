import React from 'react'
import { useState } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';

import Navbar from './Navbar';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import { AppContext } from './AppContext';
import { useEffect } from 'react';

export default function Login() {

    let { user, loggedIn } = useContext(UserContext)
    let { auth, navigate } = useContext(AppContext)

    let [ email, setEmail ] = useState("")
    let [ password, setPassword ] = useState("")

    let [ uzenet, setUzenet ] = useState("Be kell jelentkezned!")

    async function login() {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (err) {
            setUzenet("Nem létező email cím vagy hibás jelszó!")
            console.log("Login error: ", err);
        }
    }

    useEffect(() => {
        if (loggedIn)
        {
            navigate("/messages")
        }
    })

    return (
        <>
            <Stack className='login' display={'flex'} justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
                <Stack className='container' width={550} height={600} p={1.5} marginTop={-15} border={1} borderColor={'black'} borderRadius={4}>
                    <FormControl style={{ gap: 10}}>
                        <TextField
                            required
                            label="Email"
                            type='email'
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            required
                            label="Password"
                            type='password'
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button variant="contained" onClick={login}>Login</Button>
                    </FormControl>
                    <Typography marginTop={5} fontSize={24}>
                        {uzenet}
                    </Typography>
                    <div style={{flexGrow: 1}}></div>
                    <Button variant="contained" >Google</Button>
                </Stack>
            </Stack>
        </>
    )
}
