import React from 'react'
import Navbar from './Navbar'
import Stack from '@mui/material/Stack'

export default function Messages() {
    return (
        <>
            <Navbar />
            <Stack className='messages' display={'flex'} justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
                Messages
            </Stack>
        </>
    )
}
