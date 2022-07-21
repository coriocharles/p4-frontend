import react from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Container, Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom'
import { CardActionArea } from '@mui/material'

function Homepage() {
    const navigate = useNavigate()
    const [rec, setRecs] = useState(null)
    const url = `http://localhost:8000/api/albums/recommended/${localStorage.getItem('id')}`

    function componentDidMount() {
        axios.get(url)
            .then(res => {
                const data = res.data
                setRecs(data)
                console.log(data)
            })

    }

    useEffect(() =>
        componentDidMount(), [])

    return(
        <>
        Welcome!<br></br>
            <Link to={`/artist/Grouper`}>LINK TO GROUPER</Link><br></br>
            <Link to={`/genres`}>Genres</Link><br></br>

            <Link to={`/artists`}>Artists</Link>

            {!rec
            ? ""
                : <Container component="main" maxWidth="xs" justify="center" alignItems="center">
                    <h3>Your Recommended Album:</h3>
                    {rec.map(album => {
                    return (
                        <div>
                            
                            <Card style={{ backgroundColor: '#1F1B24', color: 'white'}}>
                                <CardActionArea href={`/artist/${album.artist_name}/album/${album.name}`}>
      
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={`${album.image}`}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    
                                    
                                    
                                    <Typography variant="h5" component="div">
                                        {album.name} by {album.artist_name}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                                        {album.posts.length} Reviews
                                    </Typography>

                                </CardContent>
                                <CardActions>
                                    <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                                        {String(album.release).slice(0, 10)}
                                    </Typography>
                                    <Button size="small"><Link to={`/artist/${album.artist_name}/album/${album.name}`}>Link</Link></Button>
                                    {album.genre.map(genre => {
                                        return (
                                            <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
                                                {genre}
                                            </Typography>
                                        )
                                    })}
                                </CardActions>
                                </CardActionArea>
                            </Card><br></br>
                            <br></br>
                        </div>
                    )
                })
                    }</Container>
            }
        </>
    )
}

export default Homepage