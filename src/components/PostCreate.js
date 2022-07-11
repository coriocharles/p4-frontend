import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../axios'

function NewPost() {
    let navigate = useNavigate()
    const url = 'http://localhost:8000/api/posts/'
    const {albumid, artistid} = useParams()
    const [newPost, setNewPost] = useState({
        title: '',
        artist: Number(artistid),
        album: Number(albumid),
        published: "2022-07-06T01:13:59Z",
        content: '',
        author: Number(localStorage.getItem('id')),
        status: ''
    })
    let token = localStorage.getItem('access_token')
    const handleChange = (event) => {
        setNewPost({...newPost, [event.target.id]: event.target.value })
        console.log(newPost)
    }

    console.log(Number(localStorage.getItem('id')) == 13)
    
    const [networkErrMsg, setNetworkErrMsg] = useState(null)

    const [clientErrMsg, setClientErrMsg] = useState(null)

    const statusCodeToErr = (responseObj) => {
        setNetworkErrMsg(`Network Error of code: ${responseObj.status}`)
        // TODO - console log the err message
    }
    const clientFormValidation = (newPost) => {
        const blankFields = Object.entries(newPost)
            .filter(kv => kv[1] === '')
        if (blankFields.length > 0) {
            setClientErrMsg(`${blankFields[0][0]} can not be blank`)
            return false
        }
        setClientErrMsg(null)
        return true
    }

    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`fetching with token ${token}`)
        console.log(newPost)
        setNetworkErrMsg(null)
        if (!clientFormValidation(newPost)) {
            return
        }
        fetch(url,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': ` JWT ${token}`
                },
                body: JSON.stringify(newPost)
            }
        )
            .then(res => {
                if (res.ok) {
                    navigate(`/artist/${Number(artistid)}/album/${Number(albumid)}`)
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
        write review for {albumid} by {artistid}
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" onChange={handleChange} value={newPost.title} /><br></br>
                <label htmlFor="content">Your Review</label><br></br>
                <textarea rows="10" cols="50" type="text" id="content" onChange={handleChange} value={newPost.content} /><br></br>
                <label htmlFor="status">Review Status</label><br></br>
                <select type="text" id="status" onChange={handleChange} value={newPost.status}>
                    <option value="draft">Draft</option>
                    <option value="published">Publish</option>
                </select>
                <input type="submit" className="btn btn-danger" value="hello" />
            </form>
        </>
    )
}

export default NewPost