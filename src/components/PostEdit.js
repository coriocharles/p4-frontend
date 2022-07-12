import react from 'react'
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function EditPost() {
    const navigate = useNavigate()
    const {postid} = useParams()
    const url = `http://localhost:8000/api/posts/${postid}`
    const [post, setPost] = useState(null)
    // const [newPost, setnewPost] = useState({
    //     title: '',
    //     artist: 1,
    //     album: 1,
    //     published: "",
    //     content: '',
    //     author: 1,
    //     status: ''
    // })


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
                // setnewPost({ ...newPost, [newPost.artist]: post.value, [newPost.album]: post.value, [newPost.published]: post.value, [newPost.author]: post.value })
            })
    }
    

    useEffect(() =>
        componentDidMount(), [])



    const [networkErrMsg, setNetworkErrMsg] = useState(null)

    const [clientErrMsg, setClientErrMsg] = useState(null)

    const statusCodeToErr = (responseObj) => {
        setNetworkErrMsg(`Network Error of code: ${responseObj.status}`)
        // TODO - console log the err message
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
                    navigate(`/artist/${post.artist}/album/${post.album}`)
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