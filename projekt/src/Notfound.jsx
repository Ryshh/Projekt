import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react'
import { useContext } from 'react';
import { AppContext } from './AppContext';

export default function Notfound() {

  const { navigate } = useContext(AppContext)

  return (
      <Stack display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100vh"} width={"100vw"} backgroundColor={"#f5f5f5"}>
        <Stack width={800}>
          <Typography variant="h4" mb={2}>
            Oops! Page not found.
          </Typography>
          <Typography variant="body1" my={2}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon sx={{ fontSize: "48px !important" }} />}
            sx={{ 
              px: 4, 
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: 32,
              fontWeight: 700
            }}
            onClick={() => navigate("/")}
          >
            Back to Homepage
          </Button>
        </Stack>
      </Stack>
  )

}