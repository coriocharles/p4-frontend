import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Avatar, Button, CssBaseline, Grid, Typography, Rating } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

function UserPage()  {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const [userPosts, setUserPosts] = useState(null)
    const url = `http://localhost:8000/api/user/${id}`
    const urlposts = `http://localhost:8000/api/posts/user/${id}`

    function componentDidMount() {
        axios.all([
            axios.get(url),
            axios.get(urlposts)
        ])
            .then(axios.spread((data1, data2) => {
                
                setUser(data1.data)
                setUserPosts(data2.data)
            }));

    }

    useEffect(() =>
        componentDidMount(), [])


    return (
        <>
        {!user 
        ? ""
                : <Container component="main" maxWidth="xs" justify="center" alignItems="center" >
                    <CssBaseline />
                    <div>


                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            style={{ minHeight: '6vh' }}
                        >
                            
                            <Grid item xs={3}>

                                <Avatar src={`${user.avatar}`} />
                            </Grid>

                        </Grid>
                        <Typography component="h1" variant="h5">
                            {user.user_name}
                        </Typography>
                        <Button
                            href={`/editprofile/`}
                            color="primary"
                            variant="outlined"
                            to={`/editprofile/`}
                            style={{ margin: '20px' }}
                        >Edit Profile</Button>
                        {!userPosts
                            ? <h1>no posts from this user</h1>
                        : 
                                userPosts.map(post => {
                                    return (
                                        <>
                                            <Card style={{ backgroundColor: '#1F1B24', color: 'white' }}>
                                                <CardContent>
                                                    <Rating
                                                        precision={0.5}
                                                        defaultValue={1}
                                                        name="read-only"
                                                        value={post.rating}
                                                        readOnly

                                                    />
                                                    <Typography variant="h5" component="div">
                                                        {post.album_name} by {post.artist_name}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
                                                        {post.title}
                                                    </Typography>
                                                    
                                                    <Typography variant="body2">
                                                        {post.content}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
                                                        {String(post.published).slice(0, 10)}
                                                    </Typography>
                                                    <Button size="small"><Link to={`/artist/${post.artist_name}/album/${post.album_name}`}>Link</Link></Button>
                                    
                                                </CardActions>
                                            </Card><br></br></>
                                    )
                                })
                             }
                        
                        
                    </div>
                </Container>}
                
        </>
    )
}


export default UserPage