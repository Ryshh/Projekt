import React, { useState, useContext, useEffect } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

import Navbar from './Navbar';
import { UserContext } from './UserContext';
import { AppContext } from './AppContext';

export default function Login() {

    let { loggedIn } = useContext(UserContext)
    let { auth, navigate, setCurrentPage, db } = useContext(AppContext)

    let [ username, setUsername ] = useState("")
    let [ email, setEmail ] = useState("")
    let [ password, setPassword ] = useState("")

    let [ uzenet, setUzenet ] = useState("")
    let [ signingUp, setSigningUp ] = useState(false)

    useEffect(() => {
        setCurrentPage("login")
    }, [setCurrentPage])

    useEffect(() => {
        if (loggedIn) navigate("/messages")
    }, [loggedIn, navigate])

    async function EmailAndPassword() {
        if (!signingUp) {
            if (!email || !password) return setUzenet("Please fill all fields!");
            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (err) {
                setUzenet("Incorrect email or password")
                console.error(err)
            }
        } else {
            if (!email || !password || !username) return setUzenet("Please fill all fields!");
            try {
                const res = await createUserWithEmailAndPassword(auth, email, password)
                await setDoc(doc(db, "users", res.user.uid), {
                    username: username,
                    userPic: "",
                    uid: res.user.uid,
                    email: email,
                    isAdmin: false
                })
            } catch (err) {
                setUzenet("Error creating account: " + err.message)
                console.error(err)
            }
        }
    }

    return (
        <>
            <Navbar />
            <Stack 
                sx={{ 
                    height: 'calc(100vh - 80px)',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'background.default',
                    p: 2
                }}
            >
                <Paper 
                    elevation={3}
                    sx={{
                        width: '100%',
                        maxWidth: 550,
                        p: 4,
                        borderRadius: 2,
                        textAlign: 'center',
                        bgcolor: 'background.paper'
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                        {signingUp ? "Create Account" : "Welcome Back"}
                    </Typography>

                    <FormControl fullWidth sx={{ gap: 2 }}>
                        {signingUp && (
                            <TextField
                                required
                                label="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        )}
                        <TextField
                            required
                            label="Email"
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            required
                            label="Password"
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <Button 
                            variant="contained" 
                            size="large"
                            onClick={EmailAndPassword}
                            sx={{ mt: 1, py: 1.5, fontSize: '1.1rem' }}
                        >
                            {signingUp ? "Register" : "Login"}
                        </Button>
                    </FormControl>

                    <Typography color='error' sx={{ mt: 2, minHeight: 30 }}>
                        {uzenet}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                        {signingUp ? "Already have an account?" : "Don't have an account yet?"}
                    </Typography>

                    <Button 
                        variant="contained" 
                        onClick={() => {
                            setSigningUp(!signingUp)
                            setUzenet("")
                        }}
                        sx={{ 
                            bgcolor: "#4FBA25", 
                            color: 'white',
                            '&:hover': { bgcolor: "#3e961d" }
                        }}
                    >
                        {signingUp ? "Sign in instead" : "Sign up"}
                    </Button>
                </Paper>
            </Stack>
        </>
    )
}