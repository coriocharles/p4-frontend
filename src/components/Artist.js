import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardMedia, Grid, Typography, Container } from '@mui/material'
import axios from 'axios'


function Artist(){
    const [artist, setArtist] = useState(null)
    const {id} = useParams() 
    const url = `http://localhost:8000/api/artists/${id}`
    console.log(url)
    function componentDidMount() {
        axios.get(url)
            .then(res => {
                const data = res.data
                setArtist(data)
            })
    }

    useEffect(() =>
        componentDidMount(), [])

    

    return(
        <div>
            {!artist
                ? "no data yet"
                : <div>
                    <h1>{artist.name}</h1>
                    <h1>{artist.id}</h1>
                    {artist.albums.map(album => {
                        return (
                            <div>
                            <br></br>
                                <Link to={`/artist/${artist.id}/album/${album.id}`}>{album.name}</Link>
                            
                                <img src={album.image} width="50" height="70" alt="broken" />
                            </div>
                        )
                    })
                    }
                    <Link to={`/artist/${artist.id}/newalbum`}>Enter new album</Link>
                </div>
            }
        </div>
    )
}

export default Artist