import React from 'react'
import { AppBar, Toolbar, Typography, CssBaseline, Link, Button } from '@mui/material'
import { useEffect,useState } from 'react'
import axios from 'axios'
import {Avatar} from '@mui/material'

function Header() {
    const [user, setUser] = useState(null)
    const [isloggedin, setloggedin] = useState(null)
    
        let url = `http://localhost:8000/api/user/${Number(localStorage.getItem('id'))}`
        function componentDidMount() {
            axios.get(url)
                .then(res => {
                    const data = res.data
                    setUser(data)
                })
           
        }
        useEffect(() =>
            componentDidMount(), [])
    


    return(
    <React.Fragment>
        <CssBaseline />
            <AppBar position="static"
                color="default"
                elevation={0}>
            <Toolbar>
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                    >
                        <Link
                            
                            href="/"
                            underline="none"
                            color="textPrimary"
                        >
                            Home
                        </Link>
                    </Typography>
                    {localStorage.getItem('user')
                        ? <>
                            {user
                                ? <Avatar src={`${user.avatar}`} />
                            : ""}
                            <Button
                                href="/editprofile"
                                color="primary"
                                variant="outlined"
                                to={`/editprofile`}
                            >
                                Edit Profile
                            </Button><Button
                            href="/logout"
                            color="primary"
                            variant="outlined"
                            to="/logout"
                        >
                            Logout {localStorage.getItem('user')}
                        </Button>
                            
                        </>
                        
                        : <div>
                            <nav>
                                <Link
                                    color="textPrimary"
                                    href="/register"
                                    to="/register"
                                >
                                    Register
                                </Link>
                            </nav>
                            <Button
                                href="/login"
                                color="primary"
                                variant="outlined"
                                to="/login"
                            >
                                Login
                            </Button>
                        </div>

                    }
                    
                    
            </Toolbar>
        </AppBar>
    </React.Fragment>)
}

export default Header