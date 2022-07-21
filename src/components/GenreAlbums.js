import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Avatar, Button, CssBaseline, Grid, Typography, Rating, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material'
function GenreAlbums() {
    const [genre, setGenre] = useState(null)
    const { name } = useParams()
    const url = `http://localhost:8000/api/genres/${name}`
    console.log(url)
    function componentDidMount() {
        axios.get(url)
            .then(res => {
                const data = res.data
                setGenre(data)
            })
    }

    useEffect(() =>
        componentDidMount(), [])



    return (
        <div>
            {!genre
                ? "no data yet"
                : <div style={{ margin: "auto", position: 'absolute', width: '100vw' }}>
                    <h1>{name} Albums</h1>
                    <div style={{ display: "flex" }}>

                    {genre.album_list.map(album => {
                        return (
                            <div style={{ display: "flex", margin: "auto", overflow: 'hidden'}}>
                                <Card sx={{ minWidth: 275 }} style={{ padding: '30px', margin: '10px', height: '40vh', backgroundColor: '#1F1B24', color: 'white' }}>
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
                                        

                                    </CardContent>
                                    <CardActions>
                                        
                                        
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
                </div></div>
            }
        </div>
    )
}

export default GenreAlbums