import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function NewGenre() {
    const url = 'http://localhost:8000/api/genres/'
    const [genre, setGenre] = useState({
        name: ''
    })
    let navigate = useNavigate()
    let token = localStorage.getItem('access_token')
    const handleChange = (event) => {
        setGenre({ ...genre, [event.target.id]: event.target.value })
        console.log(genre)
    }



    const [networkErrMsg, setNetworkErrMsg] = useState(null)

    const statusCodeToErr = (responseObj) => {
        setNetworkErrMsg(`Network Error of code: ${responseObj.status}`)
        // TODO - console log the err message
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`fetching with token ${token}`)
        setNetworkErrMsg(null)
        fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ` JWT ${token}`
                },
                body: JSON.stringify(genre)
            }
        )
            .then(res => {
                if (res.ok) {
                    return res.json()
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
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">name</label>
                <input type="text" id="name" onChange={handleChange} value={genre.name} /><br></br>

                <input type="submit" className="btn btn-danger" value="hello" />
            </form>
        </>
    )
}

export default NewGenre