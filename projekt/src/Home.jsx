import React from 'react'
import Stack from '@mui/material/Stack';
import Navbar from './Navbar';

export default function Home() {
    return (
        <>
            <Navbar />
            <Stack className='home'>
                <Stack className='container' marginX={20}>
                    Home
                </Stack>
            </Stack>
        </>
    )
}
    