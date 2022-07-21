import react from 'react'
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function EditPost() {
    const navigate = useNavigate()
    const {postid} = useParams()
    const url = `http://localhost:8000/api/posts/${postid}`
    const [post, setPost] = useState(null)
    let token = localStorage.getItem('access_token')
    
    const handleChange = (event) => {
        setPost({ ...post, [event.target.id]: event.target.value })
        console.log(post)
    }

    function componentDidMount() {
        axios.get(url)
            .then(res => {
                const data = res.data
                setPost(data)
            })
    }
    

    useEffect(() =>
        componentDidMount(), [])



    const [networkErrMsg, setNetworkErrMsg] = useState(null)
    const [clientErrMsg, setClientErrMsg] = useState(null)
    const statusCodeToErr = (responseObj) => {
        setNetworkErrMsg(`Network Error of code: ${responseObj.status}`)
    }
    const clientFormValidation = (post) => {
        const blankFields = Object.entries(post)
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
        setNetworkErrMsg(null)
        console.log(post)
        if (!clientFormValidation(post)) {
            return
        }
        fetch(url,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ` JWT ${token}`
                },
                body: JSON.stringify(post)
            }
        )
            .then(res => {
                if (res.ok) {
                    navigate(`/artist/${post.artist_name}/album/${post.album_name}`)
                    return res.json()
                } else {
                    statusCodeToErr(res)
                    return Promise.resolve(null)
                }
            })
            .then(data => {
                if (!data) {
                    console.log(`problem with network request: ${networkErrMsg}`)
                    navigate(`/artist/${post.artist_name}/album/${post.album_name}`)
                } else {
                    console.log(data)
                }
            })
    }


    return (
        <div>
            {!post
            ?"loading"
                : <>write review for {post.album} by {post.artist}
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" onChange={handleChange} value={post.title} placeholder={post.title}/><br></br>
                <label htmlFor="content">Your Review</label><br></br>
                <textarea rows="10" cols="50" type="text" id="content" onChange={handleChange} value={post.content} placeholder={post.content}/><br></br>
                <label htmlFor="status">Review Status</label><br></br>
                <select type="text" id="status" onChange={handleChange} value={post.status}>
                    <option value="draft">Draft</option>
                    <option value="published">Publish</option>
                </select>
                <input type="submit" className="btn btn-danger" value="hello" />
            </form>
            </>}
            
        </div>
    )
}


export default EditPost