import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useParams, Link } from 'react-router-dom'

const SearchAlbum = ({data}) => {
    const url = ''
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
            <div>
                {!appState
                    ? "no data yet"
                    : <div>
                        <h1>Results</h1>
                        {appState.map(album => {
                            return (
                                <div>
                                    <Link to={`/artist/${album.artist_name}/album/${album.name}`}>{album.name} by {album.artist_name}</Link><br></br>
                                    <img src={album.image} width="50" height="70" alt="broken" />
                                </div>
                            )
                        })
                        }

                        
                    </div>
                }
            </div>
        </>
    );
};
export default SearchAlbum;