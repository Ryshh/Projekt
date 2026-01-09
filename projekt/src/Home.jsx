import React from 'react'
import Stack from '@mui/material/Stack';
import Navbar from './Navbar';
import { useContext } from 'react';
import { AppContext } from './AppContext';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BoltIcon from '@mui/icons-material/Bolt';
import Paper from '@mui/material/Paper';

export default function Home() {

    const { auth, navigate, setCurrentPage } = useContext(AppContext)

    setCurrentPage("home")

    return (
        <>
            <Navbar />
            <Stack className='home' sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, width: "100vw", height: "100vh" }}>
                <Stack>
                    <Stack spacing={6} alignItems="center" textAlign="center">
                    
                        <Avatar
                            src="/PingMe.png" 
                            alt="PingMe Logo"
                            sx={{ width: 120, height: 'auto', mb: -2 }}
                        />

                        <Stack>
                            <Typography variant="h6" color="textSecondary" sx={{ mb: 1, maxWidth: '700px', mx: 'auto', fontSize: "32px" }}>
                                Connect with your friends, family, and colleagues in real-time with PingMe. Secure, fast, and beautiful.
                            </Typography>
                        </Stack>

                        <Stack 
                            direction={{ xs: 'column', md: 'row' }} 
                            spacing={4} 
                            sx={{ mt: 8, width: '100%' }}
                        >
                            {[
                            { icon: <BoltIcon color="primary" />, title: 'Real-time', desc: 'No delays, no lag. Just instant messaging.' },
                            { icon: <ChatBubbleOutlineIcon color="primary" />, title: 'Simple', desc: 'Minimalist design for better focus.'}
                            ].map((feature, index) => (
                            <Paper key={index} elevation={0} sx={{ p: 4, flex: 1, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                                <Stack sx={{ mb: 1 }}>{feature.icon}</Stack>
                                <Typography variant="h6" fontWeight="bold" fontSize={"32px"}>{feature.title}</Typography>
                                <Typography variant="body2" color="textSecondary" fontSize={"32px"}>{feature.desc}</Typography>
                            </Paper>
                            ))}
                        </Stack>

                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}
    