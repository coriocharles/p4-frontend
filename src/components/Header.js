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
        
    </React.Fragment>)
}

export default Header