import React from 'react'
import Stack from '@mui/material/Stack';
import Navbar from './Navbar';
import { useContext } from 'react';
import { AppContext } from './AppContext';

export default function Home() {

    const { auth, navigate, setCurrentPage } = useContext(AppContext)

    setCurrentPage("home")

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
    