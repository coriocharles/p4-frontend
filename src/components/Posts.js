import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardMedia, Grid, Typography, Container } from '@mui/material'


const Posts = () => {
    const dbURL = 'http://localhost:8000/api/posts'
    const [posts, setPosts] = useState(null)

    useEffect(() => {
            fetch(dbURL)
                .then(res => res.json())
                .then(data =>
                    setPosts(data)
                )
                .then(console.log(posts))

        }, [])
    console.log(posts)
    return(
        <div>
            {
                !posts || posts.length === 0
                    ?<p>no posts found</p>
                    : 
                    <Container maxWidth="md" component="main">
                        <Grid container spacing={5} alignItems="flex-end">
                            {posts.map((post) => {
                                return (
                                    <Grid item key={post.id} xs={12} md={4}>
                                        <Card>
                                            
                                            <CardContent >
                                                <Typography
                                                    gutterBottom
                                                    variant="h6"
                                                    component="h2"
                                                >
                                                    {post.title.substr(0, 50)}...
                                                </Typography>
                                                <div >
                                                    <Typography
                                                        component="p"
                                                        color="textPrimary"
                                                    ></Typography>
                                                    <Typography variant="p" color="textSecondary">
                                                        {post.content.substr(0, 60)}...
                                                    </Typography>
                                                </div>
                                                <Link to={`artist/${post.artist}`}>{post.artist}
                                                </Link><br></br>
                                                <Link to={`album/${post.album}`}>{post.artist}
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Container>


            }
        </div>
       
    )
}

export default Posts