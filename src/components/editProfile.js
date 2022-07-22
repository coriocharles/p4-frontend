import React from 'react'
import { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import axios from 'axios'

function EditProfile() {
    let navigate = useNavigate()
    const userID = localStorage.getItem("id")
    const url = `http://localhost:8000/api/user/${userID}`
    const [user, setUser] = useState({
        user_name: '',
        avatar: ''
    })
    const [userAvatar, setUserAvatar] = useState(null)


    let token = localStorage.getItem('access_token')

    const handleChange = (event) => {
        if ([event.target.name] === 'avatar') {
            setUserAvatar({
                avatar: event.target.files
            })
        } else {
        setUser({ ...user, [event.target.id]: event.target.value })
        console.log(user) }
    }

    const [networkErrMsg, setNetworkErrMsg] = useState(null)


    
    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append('user_name', user.user_name)
        formData.append('password', user.password)
        formData.append('avatar', userAvatar.avatar[0])
        console.log(`fetching with token ${token}`)
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        setNetworkErrMsg(null)
        axios.put(url, formData,
            {
                headers: {
                    'Authorization': ` JWT ${token}`,
                    'content-type': 'multipart/form-data',
                },

            })
            .then(res => {
                if (res.ok) {
                    localStorage.setItem('user', user.user_name)
                    navigate(`/`)
                    return res.json()
                } else {
                    if (res.status === 400) {
                        setNetworkErrMsg(res.data);
                    }
                }
            })
            .then(data => {
                if (!data) {
                    console.log(`problem with network request: ${networkErrMsg}`)
                    localStorage.setItem('user', user.user_name)
                    navigate(`/`)
                } else {

                    console.log(data)

                    // call to refresh the list
                    // set RefreshCounter(refreshCounter + 1)
                }
            })
    }







    return (
        <div>
            {!user
                ? "loading"
                : <>Edit your profile
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="user_name" onChange={handleChange} value={user.user_name} placeholder={localStorage.getItem('user')} /><br></br>
                        <input accept='image/*' id="avatar" onChange={handleChange} name='avatar' type='file' />
                        <input type="submit" className="btn btn-danger" value="Update" />
                    </form>
                </>}

        </div>
    )
}


export default EditProfile