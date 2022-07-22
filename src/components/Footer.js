import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="gray">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Charlie Corio
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '90vh',
            }}
        >
            <CssBaseline />
           
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: "#1F1B24"
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body1">
                        bugeater production
                    </Typography>
                    <Copyright />
                </Container>
            </Box>
        </Box>
    );
}