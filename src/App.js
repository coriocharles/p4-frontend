import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Posts from './components/Posts'
import PostLoadingComponent from './components/PostLoading'
const dbURL = 'http://localhost:8000/api/posts'

function App() {
  const PostLoading = PostLoadingComponent(Posts)
  const [appState, setAppState] = useState({
    loading: false,
    posts: null
  })

  
  useEffect(() => {
    setAppState({loading: true})
    fetch(dbURL)
      .then(res => res.json())
      .then((posts) => {
        setAppState({loading: false, posts: posts})
      })
  
  }, [])

  return (
    <div className="App">
      <h1>working</h1>
      <h2>hello</h2>
      <PostLoading isLoading={appState.loading} post={appState.posts} />
      
    </div>
  );
}

export default App;
