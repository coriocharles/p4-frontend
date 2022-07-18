import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useParams, Link } from 'react-router-dom'


const SearchArtist = ({data}) => {
    const url = ''
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
            appState.map(result=> {
            return(
                <>
                <Link to={`/artist/${result.name}`}>{result.name}</Link><br></br>
                </>
            )
        })
            
        }
        </>
    );
};
export default SearchArtist;