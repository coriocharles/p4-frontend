import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom'



const SearchGenre = ({data}) => {
    const url = ''
    const search = 'search';
    const [appState, setAppState] = useState(null);
    console.log(data)
    useEffect(() => {
        axios.get('http://localhost:8000/api/' + search + `/genres/` + window.location.search).then((res) => {
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
                    <Link to={`/genres/${result.name}`}>{result.name}</Link>
                </>
            )
        })
            
        }
        </>
    );
};
export default SearchGenre;