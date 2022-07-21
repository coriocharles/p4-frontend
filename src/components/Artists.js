import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Avatar, Button, CssBaseline, Grid, Typography, Rating } from '@mui/material';
import { CardActionArea } from '@mui/material'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

function Artists() {
    const [artists, setArtists] = useState(null)
    const url = `http://localhost:8000/api/artists/`
    console.log(url)
    function componentDidMount() {
        axios.get(url)
            .then(res => {
                const data = res.data
                setArtists(data)
            })
    }

    useEffect(() =>
        componentDidMount(), [])

    

    return (
        <div style={{ backgroundColor: "#3E393F", color: 'whitesmoke' }} >
            {!artists
                ? "no data yet"
                : <div style={{ margin: "auto", position: 'absolute', width: '100vw' }}>
                    <h1>Artists</h1>
                    <div style={{ display: "flex"}}>                    
                    {artists.map(artist => {
                        return (
                            <div style={{ display: "flex", margin: "auto", overflow: 'hidden',width:'100vw' }}>
                                
                                <Card style={{ padding: '30px', margin: '10px', width: '23vw', height: '40vh', backgroundColor: '#1F1B24', color: 'white'  }}>
                                    <CardActionArea href={`/artist/${artist.name}`}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`${artist.image_url}`}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        
                                        <Typography variant="h5" component="div">
                                            {artist.name}
                                        </Typography>
                                        <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
                                            {artist.albums.length} Albums
                                        </Typography>

                                    </CardContent>
                                    </CardActionArea>
                                </Card><br></br>
                                <br></br>

                                <br></br>

                            </div>
                        )
                    })
                    }
                </div></div>
            }
        </div>
    )
}

export default Artists