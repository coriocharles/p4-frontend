import axios from 'axios'
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function NewAlbum() {
    const navigate = useNavigate()
    const url = 'http://localhost:8000/api/albums/create'
    const {id}= useParams()
    const [album, setAlbum] = useState({
        name: '',
        artist: Number(id)
    })
    const [postimage, setPostImage] = useState(null)
    const [networkErrMsg, setNetworkErrMsg] = useState(null)
    let token = localStorage.getItem('access_token')


    const handleChange = (event) => {
        if ([event.target.name] == 'image') {
            setPostImage({
                image: event.target.files,
            });
            console.log(event.target.files);
        } else {
        setAlbum({ ...album, [event.target.id]: event.target.value })
        console.log(album)}
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append('name', album.name);
        formData.append('artist', album.artist)
        formData.append('image', postimage.image[0])
        console.log(`fetching with token ${token}`)
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        setNetworkErrMsg(null)
        axios.post(url, formData,
            {
                method: 'POST',
                headers: {
                    'Authorization': ` JWT ${token}`,
                    'content-type': 'multipart/form-data',
                },
                
            })
            .then(res => {
                if (res.ok) {
                    // navigate(`/artist/${id}`)
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
                    
                } else {

                    console.log(data)

                    // call to refresh the list
                    // set RefreshCounter(refreshCounter + 1)
                }
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">name</label>
                <input type="text" id="name" onChange={handleChange} value={album.name} /><br></br>
                <input accept='image/*' id="post-image" onChange={handleChange} name='image' type='file'/>
                <input type="submit" className="btn btn-danger" value="goodbye" />
            </form>
        </>
    )
}

export default NewAlbum