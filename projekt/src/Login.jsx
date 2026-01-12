import React from 'react'
import { useState } from 'react';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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
import { collection, doc, setDoc } from 'firebase/firestore';

export default function Login() {

    let { loggedIn } = useContext(UserContext)
    let { auth, navigate, setCurrentPage, db } = useContext(AppContext)


    let [ username, setUsername ] = useState("")
    let [ email, setEmail ] = useState("")
    let [ password, setPassword ] = useState("")

    let [ uzenet, setUzenet ] = useState("")
    let [ signingUp, setSigningUp ] = useState(false)

    async function EmailAndPassword() {
        if (!signingUp) {
            if (!email || !password) return setUzenet("Please fill all fields!");

            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (err) {
                setUzenet("Incorrect email or password")
                console.log("Login error: ", err);
            }  
        }
        else{
            if (!username || !email || !password) return setUzenet("Please fill all fields!");

            try {
                const result = await createUserWithEmailAndPassword(auth, email, password)
                setUzenet("");

                if (signingUp) {
                    let newUser = {
                        username: username,
                        email: email,
                        userPic: "",
                    }

                    await setDoc(doc(db, "users", result.user.uid), newUser);
                }
            } catch (err) {
                setUzenet(err.message.includes("auth/invalid-credential") ? "Incorrect email or password" : err.message);
            } 
        }
    }

    useEffect(() => {
        if (loggedIn)
        {
            navigate("/messages")
        }

        setCurrentPage("login")
    }, [loggedIn, navigate, setCurrentPage])

    return (
        <>
            <Navbar />
            <Stack height={"100vh"} width={"100vw"} display={'flex'} justifyContent={'center'} alignItems={'center'} textAlign={'center'} bgcolor={"#f5f5f5"}>
                <Stack className='container' width={550} height={600} p={1.5} marginTop={-15}>
                    <FormControl style={{ gap: 10}}>
                        {signingUp ? <>
                            <TextField
                                required
                                label="Username"
                                type='text'
                                onChange={e => setUsername(e.target.value)}
                            />
                        </> : <>
                            
                        </>}
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
                        {!signingUp ? <>
                            <Button variant="contained" onClick={EmailAndPassword}>Login</Button>
                        </> : <>
                            <Button variant="contained" onClick={EmailAndPassword}>Register</Button>
                        </>}
                    </FormControl>
                    <Typography color='error' marginTop={5} fontSize={24} height={50}>
                        {uzenet}
                    </Typography>
                    <hr style={{ width: "100%"}} />
                    {!signingUp ? <>
                            <Button variant="contained" style={{ backgroundColor: "#4FBA25"}} onClick={() => setSigningUp(true)}>Sign up</Button>
                        </> : <>
                            <Button variant="contained" style={{ backgroundColor: "#4FBA25"}} onClick={() => setSigningUp(false)}>Sign in</Button>
                    </>}
                </Stack>
            </Stack>
        </>
    )
}
