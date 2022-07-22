import React from 'react'
import { useEffect, useState } from 'react'
import { Card, Typography, Container } from '@mui/material'
import axios from 'axios'
import { CardActionArea } from '@mui/material'

function Genres() {
    const [genres, setGenres] = useState(null)
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
                    <h1>Genres</h1>
                    <Container component="main" maxWidth="xs" justify="center" alignItems="center">
                    {genres.map(genre => {
                        return (
                            <div>
                                <CardActionArea href={`/genres/${genre.name}`}>
                            <Card style={{ backgroundColor: '#1F1B24', color: 'white', height:'5vh'}}>
                                   
                                        <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
                                            {genre.name}
                                        </Typography>
                                    
                                            </Card>
                                    </CardActionArea>
                            <br></br>
                                
    
                            </div>
                        )
                    })
                        }</Container>
                </div>
            }
        </div>
    )
}

export default Genres