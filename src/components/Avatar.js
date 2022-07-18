import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Avatar } from "@mui/material";
function AvatarImage(userSignedIn, setUserAvatar, avatar) {
        console.log(userSignedIn)
        let url = `http://localhost:8000/api/user/${userSignedIn.id}`
        function componentDidMount() {
            axios.get(url)
                .then(res => {
                    const data = res.data
                    setUserAvatar(data.avatar)
                    console.log(data.avatar)
                })

        }
        

    
useEffect(() =>
            componentDidMount(), [])
    return(
    <>
            
            {avatar
                ? <Avatar src={`${avatar.avatar}`} />
                : ""} 
    </>
    )
}

export default AvatarImage