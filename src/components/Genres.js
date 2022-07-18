import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardMedia, Grid, Typography, Container } from '@mui/material'
import axios from 'axios'


function Genres() {
    const [genres, setGenres] = useState(null)
    const { name } = useParams()
    const url = `http://localhost:8000/api/genres/`
    console.log(url)
    function componentDidMount() {
        axios.get(url)
            .then(res => {
                const data = res.data
                setGenres(data)
            })
    }

    useEffect(() =>
        componentDidMount(), [])



    return (
        <div>
            {!genres
                ? "no data yet"
                : <div>
                    <h1>List of genres</h1>
                    {genres.map(genre => {
                        return (
                            <div>
                                <br></br>
                                <Link to={`/genres/${genre.name}`}>{genre.name}</Link>
                            </div>
                        )
                    })
                    }
                </div>
            }
        </div>
    )
}

export default Genres