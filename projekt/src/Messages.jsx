import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { Stack, TextField, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Paper, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { UserContext } from './UserContext'
import { AppContext } from './AppContext'
import { collection, query, where, getDocs, onSnapshot, orderBy, or, and, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Messages() {
    const { user, userInfo } = useContext(UserContext) 
    const { db, setCurrentPage } = useContext(AppContext)

    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const scrollRef = useRef()

    useEffect(() => {
        setCurrentPage("messages")
    }, [setCurrentPage])

    useEffect(() => {
        async function fetchUsers() {
            if (!user?.uid || !db) return
            try {
                const q = query(collection(db, "users"));
                const snap = await getDocs(q);

                const userList = snap.docs
                    .map(doc => ({ ...doc.data(), id: doc.id })) 
                    .filter(u => u.id !== user.uid);

                setUsers(userList);
            } catch (err) {
                console.error("Error fetching users:", err)
            }
        }
        fetchUsers()
    }, [db, user?.uid])

    useEffect(() => {
        if (!selectedUser || !user?.uid || !db) return;

        const q = query(
            collection(db, "messages"),
            or(
                and(where("senderId", "==", user.uid), where("receiverId", "==", selectedUser.id)),
                and(where("senderId", "==", selectedUser.id), where("receiverId", "==", user.uid))
            ),
            orderBy("timestamp", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setMessages(fetchedMessages);
            
            setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        }, (error) => {
            console.error("Firestore error:", error);
        });

        return () => unsubscribe();
    }, [selectedUser, user?.uid, db]);

    const sendMessage = async () => {
        if (!newMessage.trim() || !selectedUser || !db) return
        
        try {
            await addDoc(collection(db, "messages"), {
                text: newMessage,
                senderId: user.uid,
                receiverId: selectedUser.id,
                timestamp: serverTimestamp()
            })
            setNewMessage("")
        } catch (err) {
            console.error("Error sending message:", err)
        }
    }

    return (
        <>
            <Navbar />
            <Stack direction="row" sx={{ height: 'calc(100vh - 100px)', width: "100vw", bgcolor: '#f0f2f5' }}>
                <Stack sx={{ width: { xs: '80px', md: '350px' }, bgcolor: 'white', borderRight: '1px solid #ddd' }}>
                    <List sx={{ overflowY: 'auto' }}>
                        {users.map((u) => (
                            <ListItem key={u.id} component="button" onClick={() => setSelectedUser(u)} 
                                sx={{ 
                                    bgcolor: selectedUser?.id === u.id ? '#f0f2f5' : 'transparent', 
                                    border: 'none', width: '100%', cursor: 'pointer', px: '10px', py: '14px'
                                }}>
                                <ListItemAvatar>
                                    <Avatar src={u.userPic}>{u.username?.[0]}</Avatar>
                                </ListItemAvatar>
                                <ListItemText sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'left' }} primary={u.username} />
                            </ListItem>
                        ))}
                    </List>
                </Stack>

                <Stack sx={{ flexGrow: 1 }}>
                    {selectedUser ? (
                        <>
                            <Paper square elevation={0} sx={{ p: 2, borderBottom: '1px solid #ddd' }}>
                                <Typography variant="h6">{selectedUser.username}</Typography>
                            </Paper>
                            
                            <Stack sx={{ flexGrow: 1, p: 3, overflowY: 'auto', gap: 1 }}>
                                {messages.map((msg, i) => (
                                    <Paper key={i} sx={{ 
                                        p: 1.5, maxWidth: '70%', borderRadius: 2,
                                        alignSelf: msg.senderId === user.uid ? 'flex-end' : 'flex-start',
                                        bgcolor: msg.senderId === user.uid ? 'primary.main' : 'white',
                                        color: msg.senderId === user.uid ? 'white' : 'black'
                                    }}>
                                        <Typography variant="body1">{msg.text}</Typography>
                                    </Paper>
                                ))}
                                <div ref={scrollRef} />
                            </Stack>

                            <Paper square sx={{ p: 2 }}>
                                <Stack direction="row" spacing={1}>
                                    <TextField 
                                        fullWidth size="small" placeholder="Type a message..." 
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)} 
                                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    />
                                    <IconButton color="primary" onClick={sendMessage}>
                                        <SendIcon />
                                    </IconButton>
                                </Stack>
                            </Paper>
                        </>
                    ) : (
                        <Stack justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
                            <Typography color="textSecondary">Select a contact to start chatting</Typography>
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </>
    )
}