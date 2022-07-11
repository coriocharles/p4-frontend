import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
//MaterialUI
import { Container, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Typography } from '@mui/material';




export default function Login() {
    const navigate = useNavigate();
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

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
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');
                navigate('/');
                //console.log(res);
                //console.log(res.data);
            });
    };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
                <Avatar></Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
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
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
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
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}