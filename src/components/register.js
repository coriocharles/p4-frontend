import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {Container, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Typography} from '@mui/material';

export default function Register() {
    const url = 'http://localhost:8000/api/user/create/'
    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        email: '',
        username: '',
        password: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
            
        });
        console.log(formData)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formDatasend = new FormData();
        formDatasend.append('email', formData.email);
        formDatasend.append('user_name', formData.username);
        formDatasend.append('password', formData.password);
        for (var key of formDatasend.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        axios.post(url, formDatasend,
            {
                method: 'POST',
                headers: {
                    'content-type': 'multipart/form-data',
                },

            })
            .then((res) => {
                navigate('/login');
                console.log(res);
                console.log(res.data);
            });
    };


    return (
        <Container component="main" maxWidth="xs" justify="center" alignItems="center" style={{ backgroundColor: '#1F1B24', color: 'white', minHeight: '50vh' }}>
            <CssBaseline />
            <div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '6vh' }}
                >

                    <Grid item xs={3}>

                        <Avatar />
                    </Grid>

                </Grid> 
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form  noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{ style: { backgroundColor: '#121212', color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{ style: { backgroundColor: '#121212', color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{ style: { backgroundColor: '#121212', color: 'white' } }}
                                InputLabelProps={{ style: { color: 'white' } }}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>

    )
}
