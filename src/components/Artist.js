import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Rating } from '@mui/material'
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
                localStorage.setItem('artist', data.id)
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
                    {artist.albums.map(album => {
                        return (
                            <div>
                            <br></br>
                                <Link to={`/artist/${artist.name}/album/${album.name}`}>{album.name}</Link>
                                <p>{album.posts.length} Reviews</p>
                                <img src={album.image} width="50" height="70" alt="broken" />
                            </div>
                        )
                    })
                    }
                    
                    {!localStorage.getItem('user')
                        ? "Please Sign in to add an album"
                        : <Link to={`/artist/${artist.name}/newalbum`}>Enter new album</Link>
                    }
                </div>
            }
        </div>
    )
}

export default Artist