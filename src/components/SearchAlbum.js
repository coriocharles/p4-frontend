import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom'
import { Button,  Typography,} from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material'
const SearchAlbum = ({data}) => {
    const search = 'search';
    const [appState, setAppState] = useState(null);
    console.log(data)
    useEffect(() => {
        axios.get('http://localhost:8000/api/' + search + `/albums/` + window.location.search).then((res) => {
            const result = res.data;
            setAppState(result);
            console.log(res.data);
        });
    }, [setAppState]);

    return (
        <>
                
                {!appState
                    ? "no data yet"
                : <div style={{ margin: "auto", position: 'absolute', width: '100vw' }}>
                        <h1>Album Results</h1>
                    <div style={{ display: "flex" }}>
                        
                        
                        {appState.map(album => {
                            return (
                                <div style={{ display: "flex", margin: "auto", overflow: 'hidden' }}>
                                    <Card style={{ padding: '30px', margin: '10px', height: '50vh', backgroundColor: '#1F1B24', color: 'white' }} sx={{ minWidth: 275 }}>
                                        <CardActionArea href={`/artist/${album.artist_name}/album/${album.name}`}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={`${album.image}`}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            {album.genre.map(genre => {
                                                return (
                                                    <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
                                                        {genre.name}
                                                    </Typography>
                                                )
                                            })}
                                            <Typography variant="h5" component="div">
                                                {album.name}
                                            </Typography>
                                            <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
                                                {album.posts.length} Reviews
                                            </Typography>

                                        </CardContent>
                                        <CardActions>
                                            <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
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
                            } 
                    </div></div>
                        
                }
        </>
    );
};
export default SearchAlbum;