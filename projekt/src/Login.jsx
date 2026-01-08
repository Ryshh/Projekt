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
import { addDoc, collection } from 'firebase/firestore';

export default function Login() {

    let { user, loggedIn } = useContext(UserContext)
    let { auth, navigate, setCurrentPage } = useContext(AppContext)


    let [ username, setUsername ] = useState("")
    let [ email, setEmail ] = useState("")
    let [ password, setPassword ] = useState("")

    let [ uzenet, setUzenet ] = useState("")
    let [ signingUp, setSigningUp ] = useState(false)

    async function EmailAndPassword() {
        if (!signingUp) {
            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (err) {
                setUzenet("Incorrect email or password")
                console.log("Login error: ", err);
            }  
        }
        else{
            try {
                const result = await createUserWithEmailAndPassword(auth, email, password)

                if (signingUp) {
                    let newUser = {
                        profilePic: "",
                        userID: result.user.uid,
                        username: username,
                        email: email
                    }

                    const usersCollection = collection(db, "users")
                    await addDoc(usersCollection, newUser);
                }
            } catch (err) {
                console.log("Sign up error: ", err);
            }  
        }
    }

    useEffect(() => {
        if (loggedIn)
        {
            navigate("/messages")
        }

        setCurrentPage("login")
    })

    return (
        <>
            <Navbar />
            <Stack className='login' display={'flex'} justifyContent={'center'} alignItems={'center'} textAlign={'center'} bgcolor={"#f5f5f5"}>
                <Stack className='container' width={550} height={600} p={1.5} marginTop={-15}>
                    <FormControl style={{ gap: 10}}>
                        {signingUp ? <>
                            <TextField
                                required
                                label="Username"
                                type='text'
                                onChange={e => setEmail(e.target.value)}
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
                    <Typography marginTop={5} fontSize={24} height={50}>
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
