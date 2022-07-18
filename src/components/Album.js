import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardMedia, Grid, Typography, Container, Rating } from '@mui/material'
import axios from 'axios'
function Album({setAlbumInfo}) {
    const [album, setAlbum] = useState(null)
    const { id } = useParams()
    const url = `http://localhost:8000/api/albums/${id}`
    function componentDidMount() {
        axios.get(url)
            .then(res => {
                const data = res.data
                setAlbum(data)
                setAlbumInfo(data)
                console.log(data)
            })
        
    }

    useEffect(() =>
        componentDidMount(), [])

    const [networkErrMsg, setNetworkErrMsg] = useState(null)

    const [clientErrMsg, setClientErrMsg] = useState(null)

    const statusCodeToErr = (responseObj) => {
        setNetworkErrMsg(`Network Error of code: ${responseObj.status}`)
        // TODO - console log the err message
    }

    let token = localStorage.getItem('access_token')
    const handleSubmit = (e) => {
        let post_id = e.target.id
        e.preventDefault()
        console.log(`fetching with token ${token}`)
        setNetworkErrMsg(null)
        let posturl = `http://localhost:8000/api/posts/${post_id}`
        fetch(posturl,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ` JWT ${token}`
                },
            }
        )
            .then(res => {
                if (res.ok) {
                    componentDidMount()
                } else {
                    statusCodeToErr(res)
                    return Promise.resolve(null)
                }
            })
            .then(data => {
                if (!data) {
                    console.log(`problem with network request: ${networkErrMsg}`)
                } else {

                    console.log(data)

                    // call to refresh the list
                    // set RefreshCounter(refreshCounter + 1)
                }
            })
    }
    
    return (
        <div>
            {!album
                ? "no data yet"
                : <div>
                    <h1>{album.name} by <Link to={`/artist/${album.artist_name}`}>{album.artist_name}</Link></h1>
                    <Rating
                        precision={0.5}
                        defaultValue={1}
                        name="simple-controlled"
                        value={album.avg_rating}
                        
                    />
                    {album.posts.map(post => {
                        return(
                            <div>
                            <h1>{post.title} by {post.author_name}</h1>
                            <p>{post.content}</p>
                            <p>posting on {String(post.published).slice(0,10)}</p>
                                {!localStorage.getItem('user')
                                    ? ""
                                    : `${post.author_name}` === localStorage.getItem('user').replace(/['"]+/g, '')
                                        ? <div>
                                            <Link to={`/post/${post.id}/edit`}>Edit</Link>
                                            <button onClick={handleSubmit} id={post.id}>Delete</button>
                                        </div>
                                        : ""
                                        }
                                
                                
                            </div>
                        )
                    })}
                    {!localStorage.getItem('user')
                    ? "Please Sign in to write a review!"
                    :<Link to={`/album/${album.id}/${album.artist}/newreview`}>Write a review</Link>
                    }
                    
                </div>
                
            }
        
        </div>
    )
}

export default Album