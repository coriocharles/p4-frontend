import React from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Avatar, Button, CssBaseline, Grid, Typography, Rating, Box } from '@mui/material';
import { CardActionArea } from '@mui/material'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

function Artist(){
    let navigate = useNavigate()
    const [artist, setArtist] = useState(null)
    const {id} = useParams() 
    const url = `http://localhost:8000/api/artists/${id}`
    console.log(url)
    function componentDidMount() {
        axios.get(url)
            .then(res => {
                const data = res.data
                setArtist(data)
                localStorage.setItem('artist', data.id)
            })
    }

    useEffect(() =>
        componentDidMount(), [])

    function move(event) {
        event.preventDefault()
        navigate(`/artist/${artist.name}/newalbum`)
    }
    

    return(
        <div>
            <br></br>
            {!artist
                ? "no data yet"
                :  <div style={{display: "flex"}}>
                    <div style={{padding: '15px', margin: '0 auto'}}>
                    <CardMedia
                        component="img"
                        height="300"
                        width="140"
                        image={`${artist.image_url}`}
                        alt="green iguana"
                    />
                    <Box sx={{ width: '100%', maxWidth: 750 }}>
                        <Typography variant="h5" gutterBottom component="div">
                            {artist.name}
                        </Typography>
                            <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
                                {artist.birthday}
                            </Typography>
                        <Typography variant="body1" gutterBottom>
                            {artist.bio}
                        </Typography>
                    </Box><br></br>
                        {!localStorage.getItem('user')
                            ? "Please Sign in to add an album"
                            : <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={move}
                            >
                                Add a new album </Button>
                        }
                    </div>
                    <Container component="main" maxWidth="xs" justify="center" alignItems="center">
                    {artist.albums.map(album => {
                        return (
                            <div>
                                <Card style={{ backgroundColor: '#1F1B24', color: 'white' }}>
                                    <CardActionArea href={`/artist/${album.artist_name}/album/${album.name}`}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={`${album.image}`}
                                        alt="green iguana"
                                    />
                                                <CardContent>
                                                    {album.genre.map(genre => {
                                                        return (
                                                            <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
                                                            {genre.name}
                                                            </Typography>
                                                            )
                                                        })}
                                                    <Typography variant="h5" component="div">
                                                        {album.name}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
                                                        {album.posts.length} Reviews
                                                    </Typography>
                                                    
                                                </CardContent>
                                                <CardActions>
                                                    <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
                                                        {String(album.release).slice(0, 10)}
                                                    </Typography>
                                                    
                                                    {album.genre.map(genre => {
                                                        return (
                                                            <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
                                                                {genre}
                                                            </Typography>
                                                        )
                                                    })}
                                                </CardActions>
                                                </CardActionArea>
                                            </Card><br></br>
                            <br></br>
                                
    
                            </div>
                        )
                    })
                    }
                    
                    
                </Container>
                </div>
            }
        </div>
    )
}

export default Artist