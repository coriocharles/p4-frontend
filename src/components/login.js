import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//MaterialUI
import { Container, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Typography } from '@mui/material';




export default function Login({ setUserSignedIn, setUserAvatar}) {
    const navigate = useNavigate();
    const [flag, setFlag] = useState(null)
    const initialFormData = Object.freeze({
        user_name: '',
        password: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try { await
        axiosInstance
            .post(`token/`, {
                user_name: formData.user_name,
                password: formData.password,
                
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                localStorage.setItem('user', JSON.stringify(formData.user_name));
                localStorage.setItem('id', res.data.id);
                
                setUserSignedIn(true)
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');
                navigate('/');
                //console.log(res);
                //console.log(res.data);
                let url = `http://localhost:8000/api/user/${res.data.id}`

                axios.get(url)
                    .then(res => {
                        const data = res.data
                        setUserAvatar(data.avatar)
                        console.log(data.avatar)
                    })
            })
            

            
            }
            catch(error)  {
                console.log(error)
                setFlag(1)
            }
    ;
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
                    style={{ minHeight: '10vh' }}
                >

                    <Grid item xs={3}>

                        <Avatar />
                    </Grid>

                </Grid> 
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography >
                <form noValidate >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputProps={{ style: { backgroundColor: '#121212', color: 'white' } }}
                        InputLabelProps={{ style: { color: 'white' } }}
                        required
                        fullWidth
                        id="user_name"
                        label="Username"
                        name="user_name"
                        autoComplete="username"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        inputProps={{ style: { backgroundColor: '#121212', color: 'white' } }}
                        InputLabelProps={{ style: { color: 'white', } }}

                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    {!flag
                        ?""
                        : <p>Invalid Username or Password</p>}
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}