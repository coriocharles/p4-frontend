import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material'

const SearchArtist = ({data}) => {
    const search = 'search';
    const [appState, setAppState] = useState(null);
    console.log(data)
    useEffect(() => {
        axios.get('http://localhost:8000/api/' + search + `/artists/` + window.location.search).then((res) => {
            const result = res.data;
            setAppState(result);
            console.log(res.data);
        });
    }, [setAppState]);

    return (
        <>
        {!appState
            ? "no results found"
            :
                <div style={{ margin: "auto", position: 'absolute', width: '100vw' }}>
                    <h1>Artist Results</h1>
                    <div style={{ display: "flex" }}>
                        {appState.map(artist => {
                            return (
                                <div style={{ display: "flex", margin: "auto", overflow: 'hidden' }}>

                                    <Card style={{ padding: '30px', margin: '10px', height: '30vh', backgroundColor: '#1F1B24', color: 'white' }} sx={{ minWidth: 275 }}>

                                        <CardActionArea href={`/artist/${artist.name}`}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={`${artist.image_url}`}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {artist.name}
                                            </Typography>
                                            <Typography sx={{ fontSize: 14 }} color="gray" gutterBottom>
                                                {artist.albums.length} Albums
                                            </Typography>

                                        </CardContent>
                                       
                                        </CardActionArea>
                                    </Card><br></br>
                                    <br></br>

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
export default SearchArtist;