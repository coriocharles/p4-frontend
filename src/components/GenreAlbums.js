import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardMedia, Grid, Typography, Container } from '@mui/material'
import axios from 'axios'


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
                : <div>
                    <h1>{genre.name} Albums</h1>
                    {genre.album_list.map(album => {
                        return (
                            <div>

                                <h1>{album.name} by {album.artist_name}</h1>
                                <br></br>
                                <Link to={`/artist/${album.artist_name}/album/${album.name}`}>{album.name}</Link> by <Link to={`/artist/${album.artist_name}`}>{album.artist_name}</Link>
                            </div>
                        )
                    })
                    }
                </div>
            }
        </div>
    )
}

export default GenreAlbums