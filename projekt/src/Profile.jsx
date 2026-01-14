import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from './UserContext'
import { AppContext } from './AppContext'
import Navbar from './Navbar'
import { Stack, TextField, Button, Typography, Avatar, Paper, Divider } from '@mui/material'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { deleteUser } from 'firebase/auth'

export default function Profile() {
    const { user, userInfo, setUserInfo } = useContext(UserContext)
    const { db, auth, navigate, setCurrentPage } = useContext(AppContext)

    const [newName, setNewName] = useState("")
    const [newPic, setNewPic] = useState("")

    useEffect(() => {
        setCurrentPage("profile")
        if (userInfo) {
            setNewName(userInfo.username || "")
            setNewPic(userInfo.userPic || "")
        }
    }, [userInfo, setCurrentPage])

    const handleUpdate = async () => {
        try {
            const userRef = doc(db, "users", user.uid)
            await updateDoc(userRef, {
                username: newName,
                userPic: newPic
            })
            setUserInfo({ ...userInfo, username: newName, userPic: newPic })
            alert("Profile updated!")
        } catch (err) {
            console.error(err)
            alert("Failed to update profile.")
        }
    }

    const handleDeleteAccount = async () => {
        if (window.confirm("WARNING: This will permanently delete your account and messages. Proceed?")) {
            try {
                await deleteDoc(doc(db, "users", user.uid))
                await deleteUser(auth.currentUser)
                navigate("/login")
            } catch (err) {
                console.error(err)
                alert("Please log out and log back in to verify your identity before deleting your account.")
            }
        }
    }

    return (
        <>
            <Navbar />
            <Stack alignItems="center" width={"100vw"}  sx={{ py: 8, bgcolor: 'background.default', minHeight: '100vh' }}>
                <Paper sx={{ p: 4, width: '100%', maxWidth: 500, borderRadius: 4 }}>
                    <Typography variant="h4" mb={3} textAlign="center">Settings</Typography>
                    
                    <Stack alignItems="center" spacing={2} mb={4}>
                        <Avatar src={newPic} sx={{ width: 100, height: 100 }} />
                        <Typography variant="body2" color="textSecondary">Preview</Typography>
                    </Stack>

                    <Stack spacing={3}>
                        <TextField 
                            label="Username" 
                            fullWidth 
                            value={newName} 
                            onChange={(e) => setNewName(e.target.value)} 
                        />
                        <TextField 
                            label="Profile Picture URL" 
                            fullWidth 
                            value={newPic} 
                            onChange={(e) => setNewPic(e.target.value)} 
                        />
                        <Button variant="contained" size="large" onClick={handleUpdate}>
                            Save Changes
                        </Button>
                        
                        <Divider></Divider>
                        
                        <Button variant="contained" color="error" onClick={handleDeleteAccount}>
                            Delete Account
                        </Button>
                    </Stack>
                </Paper>
            </Stack>
        </>
    )
}