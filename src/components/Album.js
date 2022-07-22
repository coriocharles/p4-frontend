import React from 'react'
import { useParams, Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardMedia,Button, Typography, Container, Rating, Box } from '@mui/material'
import axios from 'axios'
import CardActions from '@mui/material/CardActions';
import { CardActionArea } from '@mui/material'
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


    const statusCodeToErr = (responseObj) => {
        setNetworkErrMsg(`Network Error of code: ${responseObj.status}`)
        // TODO - console log the err message
    }

    let token = localStorage.getItem('access_token')

    const handleSubmitLike = (e) => {
        let index = e.target.dataset.index
        let data = album.posts[index]
        data.likes.push(Number(localStorage.getItem('id')))
        console.log(data)
        fetch(`http://localhost:8000/api/posts/${e.target.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
            .then(res => {
                if (res.ok) {
                    window.location.reload()
                    return res.json()
                } else {
                    statusCodeToErr(res)
                    return Promise.resolve(null)
                }
            })
            .then(data => {
                if (!data) {
                    window.location.reload()
                } else {
                    console.log(data)
                }
            })
    }

    
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
                : <div style={{ display: "flex" }}>
                    <div style={{ padding: '15px', width: "40vw", height: '70vh', margin: '0 auto',   }}>
                        <CardMedia
                            component="img"
                            height="600"
                            width="300"
                            image={`${album.image}`}
                            alt="green iguana"
                        />
                        <Box sx={{ width: '100%', maxWidth: 750 }}>
                            <Typography variant="h5" gutterBottom component="div">
                                {album.name}
                            </Typography>
                            <CardActionArea href={`/artist/${album.artist_name}/`}>
                            <Typography variant="h7" gutterBottom component="div">
                                by {album.artist_name}
                            </Typography>
                            </CardActionArea>
                            <Typography sx={{ fontSize: 14 }} color="gray">
                                {album.release}
                            </Typography>
                    <Rating
                        precision={0.5}
                        defaultValue={1}
                        name="simple-controlled"
                        value={album.avg_rating}
                        readOnly
                        
                    />
                            <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
                                {album.genre.map(genre => {
                                    return (<> {genre}</>)
                                })}
                            </Typography>
                        </Box><br></br>
                        {!localStorage.getItem('user')
                            ? "Please Sign in to write a review!"
                            : <Link to={`/album/${album.id}/${album.artist}/newreview`} style={{ color: 'gray' }}>Write a review</Link>
                        }
                    </div>
                    <Container component="main" maxWidth="xs" justify="center" alignItems="center" style={{marginleft:"50px", marginTop:"30px"}} >
                    {album.posts.map((post, i) => {
                        return(
                            <div>
                                <Card style={{ backgroundColor: '#1F1B24', color: 'white' }}>
                                
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {post.title} <br></br>
                                    </Typography>
                                        <Typography variant="h7" component="div" >
                                            <Link to={`/users/${post.author}`}>{post.author_name}</Link>
                                        </Typography>
                                    
                                        <Typography variant="body2">
                                            {post.content}
                                        </Typography>
                                </CardContent>
                                <CardActions>
                                    <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
                                        Reviewed {String(post.published).slice(0, 10)}
                                    </Typography>
                                        {!post.likes.includes(Number(localStorage.getItem('id')))
                                            ? <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
                                                {post.likes.length} Likes
                                                <Button onClick={handleSubmitLike} color="success" id={post.id} size="small" data-index={i} >Like</Button>
                                            </Typography>
                                            : <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
                                                {post.likes.length} Liked
                                                <Button  color="success" id={post.id} size="small" data-index={i} >Liked</Button>
                                            </Typography>}
                                        
                                        
                                        {!localStorage.getItem('user')
                                            ? ""
                                            : `${post.author_name}` === localStorage.getItem('user').replace(/['"]+/g, '')
                                                ? <div>

                                                    <Button onClick={handleSubmit} color="primary" id={post.id} size="small"><Link to={`/post/${post.id}/edit`}>Edit</Link></Button>
                                                    <Button onClick={handleSubmit} color="error" id={post.id} size="small">Delete</Button>
                                                </div>
                                                : ""
                                        }
                                </CardActions>
                                
                                
                                
                            </Card><br></br>
                            <br></br>
                            </div>
                        )
                    })}
                    </Container>
                    
                    
                    
                </div>
                
            }
        
        </div>
    )
}

export default Album