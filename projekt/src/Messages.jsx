import React from 'react'
import Navbar from './Navbar'
import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import { AppContext } from './AppContext'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { UserContext } from './UserContext'

export default function Messages() {

    let { user, loggedIn } = useContext(UserContext)
    const { auth, navigate, setCurrentPage } = useContext(AppContext)
    
    setCurrentPage("messages")

    return (
        <>
            <Navbar />
            <Stack direction="row" sx={{ height: 'calc(100vh - 100px)', width: "100vw", bgcolor: '#f0f2f5' }}>
                
                <Stack sx={{ 
                    width: { xs: '80px', md: '350px' }, 
                    bgcolor: 'white', 
                    borderRight: '1px solid #ddd',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh'
                }}>
                    <Stack sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 'bold' }}>
                        Chats
                    </Typography>
                    </Stack>
                    <List sx={{ overflowY: 'auto', flexGrow: 1, '&::-webkit-scrollbar': { display: 'none' } }}>
                    {[1, 2].map((item) => (
                        <ListItem button key={item} sx={{ px: 2 }}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.main' }}></Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            sx={{ display: { xs: 'none', md: 'block' }, my: "10px" }}
                            primary="Username"
                        />
                        </ListItem>
                    ))}
                    </List>
                </Stack>

                <Stack sx={{ flexGrow: 1, height: '100%' }}>
                    
                    <Paper elevation={0} sx={{ p: 2, display: 'flex', alignItems: 'center', borderRadius: 0, borderBottom: '1px solid #ddd' }}>
                    <Avatar sx={{ mr: 2 }}></Avatar>
                    <Stack sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">Username</Typography>
                    </Stack>
                    <IconButton><MoreVertIcon /></IconButton>
                    </Paper>

                    <Stack sx={{ 
                    flexGrow: 1, 
                    p: 3, 
                    overflowY: 'auto', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2,

                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': { display: 'none' }
                    }}>

                    <Paper sx={{ p: 1.5, maxWidth: '70%', alignSelf: 'flex-start', borderRadius: '15px 15px 15px 0px' }}>
                        <Typography variant="body1">Zsidó!!!</Typography>
                    </Paper>


                    <Paper sx={{ p: 1.5, maxWidth: '70%', alignSelf: 'flex-end', bgcolor: 'primary.main', color: 'white', borderRadius: '15px 15px 0px 15px' }}>
                        <Typography variant="body1">Cigány!!!!44!4</Typography>
                    </Paper>
                    </Stack>

                    <Paper elevation={3} sx={{ p: 2, borderRadius: 0 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <TextField 
                        fullWidth 
                        placeholder="Type a message..." 
                        variant="outlined" 
                        size="small"
                        sx={{ '& fieldset': { borderRadius: '20px' } }}
                        />
                        <IconButton color="primary"><SendIcon /></IconButton>
                    </Stack>
                    </Paper>

                </Stack>
            </Stack>
        </>
    )
}
