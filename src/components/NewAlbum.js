import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Typography } from '@mui/material';

function NewAlbum() {
    const navigate = useNavigate()
    const url = 'http://localhost:8000/api/albums/create'
    const genresURL = `http://localhost:8000/api/genres`
    const {id}= useParams()
    const [album, setAlbum] = useState({
        name: '',
        artist: localStorage.getItem('artist'),
        genre: []

    })
    const [genres, setGenres] = useState(null)
    const [genreInput, setGenreInput] = useState({genre: []})
    const [postimage, setPostImage] = useState(null)
    const [networkErrMsg, setNetworkErrMsg] = useState(null)
    let token = localStorage.getItem('access_token')

    function componentDidMount() {
        axios.get(genresURL)
            .then(res => {
                const data = res.data
                setGenres(data)
            })

    }

    useEffect(() =>
        componentDidMount(), [])

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

    const handleChange2= (event) =>  {
        setGenreInput((prevstate) => ({ genre: prevstate.genre.concat([event.target.value])}))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        let uniq = Array.from([...new Set(genreInput.genre)]);
        console.log(uniq)
        console.log(postimage)
        formData.append('genre', genreInput.genre)
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
                    navigate(`/artist/${id}`)
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
                    navigate(`/artist/${id}`)
                    
                } else {

                    console.log(data)

                    // call to refresh the list
                    // set RefreshCounter(refreshCounter + 1)
                }
            })
    }

    return (
        <>
            <Container component="main" maxWidth="xs" justify="center" alignItems="center" style={{ backgroundColor: '#1F1B24', color: 'white', minHeight: '50vh' }}>
            <form onSubmit={handleSubmit}>
                <br></br>
                    <Typography component="h1" variant="h5">
                        Add Album
                    </Typography >
                <TextField 
                inputProps={{ style: { backgroundColor: '#121212', color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
                type="text" 
                id="name" 
                        label="Name"
                onChange={handleChange} 
                value={album.name} 
                        variant="outlined"
                        margin="normal"
                /><br></br>
                    <input style={{ backgroundColor: '#121212', color: 'white' }} accept='image/*' id="post-image" onChange={handleChange} name='image' type='file'/><br></br><br></br>
                
                {!genres
                    ? ""
                    : <>
                        <select
                            multiple
                            onChange={handleChange2}
                            value={album.genre}
                        >
                            {genres.map(genre => (
                                <option style={{ backgroundColor: '#121212', color: 'white' }} value={genre.name}>{genre.name}</option>
                            ))}
                        </select>
                        
                    </>
                
                }<br></br>
                    <Button type="submit" className="btn btn-danger" value="Create" >Create</Button><br></br>
            </form>
            </Container>
        </>
        
    )
}

export default NewAlbum