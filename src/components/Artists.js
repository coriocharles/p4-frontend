import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Rating } from '@mui/material'
import axios from 'axios'


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
        <div>
            {!artists
                ? "no data yet"
                : <div>
                    <h1>Artists</h1>
                    {artists.map(artist => {
                        return (
                            <div>
                                <br></br>
                                <Link to={`/artist/${artist.name}`}>{artist.name}</Link>
                            </div>
                        )
                    })
                    }
                </div>
            }
        </div>
    )
}

export default Artists