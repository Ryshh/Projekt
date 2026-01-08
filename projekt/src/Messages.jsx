import React from 'react'
import Navbar from './Navbar'
import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useContext } from 'react'
import { AppContext } from './AppContext'

export default function Messages() {

    const { auth, navigate, setCurrentPage } = useContext(AppContext)
    
    setCurrentPage("messages")

    return (
        <>
            <Navbar />
            <Stack className='messages' display={'flex'} justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
                <Stack className='container'>

                </Stack>
            </Stack>
        </>
    )
}
