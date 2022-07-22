
import './App.css';
import Footer from './components/Footer';
import Register from './components/register';
import Login from './components/login';
import Logout from './components/logout';
import Artist from './components/Artist';
import Album from './components/Album';
import NewPost from './components/PostCreate';
import Posts from './components/Posts';
import NewArtist from './components/NewArtist';
import NewAlbum from './components/NewAlbum';
import NewGenre from './components/NewGenre';
import Genres from './components/Genres';
import EditPost from './components/PostEdit';
import EditProfile from './components/editProfile';
import Homepage from './components/home';
import { Route, Routes } from 'react-router-dom'
import React from 'react'
import { AppBar, Toolbar, Typography, Link, Button, } from '@mui/material'
import {useState, useEffect} from 'react'
import {Avatar} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchArtist from './components/SearchArtist';
import SearchAlbum from './components/SearchAlbum';
import SearchGenre from './components/SearchGenre';
import axios from 'axios';
import GenreAlbums from './components/GenreAlbums';
import Artists from './components/Artists';
import UserPage from './components/User';

function App() {
  const [avatar, setUserAvatar] = useState(null)
  const [userSignedIn, setUserSignedIn] = useState(null)
  const [albumInfo, setAlbumInfo] = useState(null)
  const navigate = useNavigate()
  const [data, setData] = useState({ search: '', category: 'artists' });


  const handleChange = (event) => {
    setData({ ...data, [event.target.id]: event.target.value })
    console.log(data)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(data)
    navigate({
      pathname: `/search/${data.category}/${data.search}`,
      search: '?search=' + data.search,
    });
  }
  useEffect(() => {
    const data = window.localStorage.getItem('MY_APP_STATE');
    if (data !== null) setUserSignedIn(JSON.parse(data));
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem('picture');
    let url = `http://localhost:8000/api/user/${localStorage.getItem('id')}`

    axios.get(url)
      .then(res => {
        const data = res.data
        setUserAvatar(data.avatar)
      })
    if (data !== null) setUserAvatar(avatar);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('MY_APP_STATE', JSON.stringify(userSignedIn));
  }, [userSignedIn]);



  useEffect(() => {
    window.localStorage.setItem('picture', avatar);
  }, [avatar]);


  

  return (
    <div className="App" style={{ backgroundColor: "#121212", color: 'white' }}>
      <Link
        style={{
          fontSize: "30px", 
}}
        href="/"
        underline="none"
        color="#fff"
      >
        Tune
      </Link>
      <AppBar position="static"
        color="default"
        elevation={0}
        style={{ margin: '10px', backgroundColor: "#1F1B24"}}
        >
        
        <div style={{ display: 'flex', backgroundColor: "#hdtb" }}>
        <Toolbar>
            <div style={{ display: 'flex', float: 'left', width: '30vw', backgroundcolor: "#2b2b2b" }}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
          >
          </Typography>
                <form onSubmit={handleSubmit} style={{ display: "flex" }} >
                <input type="text" id="search" onChange={handleChange} value={data.search} style={{ backgroundColor: "#121212", color: 'white' }} /><br></br>
                <select type="text" id="category" onChange={handleChange} style={{
                  backgroundColor: "#121212", color: 'white', }} value={data.category} >
                  <option value="artists" style={{ backgroundColor: "#121212", color: 'white' }}>Artist</option>
                  <option value="albums" style={{ backgroundColor: "#121212", color: 'white' }}>Album</option>
                  <option value="genres" style={{ backgroundColor: "#121212", color: 'white' }}>Genre</option>
            </select>
                <input type="submit" className="btn btn-danger" value="search" style={{ backgroundColor: "#121212", color: 'white' }} />
          </form>
          </div>
            <div style={{ display: 'flex', float: 'center', width: '35vw', backgroundcolor: "#2b2b2b", textAlign: 'right'}}>
              <Button style={{margin: '0 auto', color: 'white'}}
                href={`/artists`}
                color="secondary"
                to={`/artists`}
              >Artists</Button>
                <Button
                style={{ margin: '0 auto', color: 'white' }}
                href={`/genres`}
                  color="secondary"
                  to={`/genres`}
                > Genres
              </Button>
            </div>
          <div style={{display: 'flex', float: 'right', width: '30vw', textAlign:'right', justifyContent:'right'}}>
          {userSignedIn
            ? <>
              {avatar
                ? <Avatar src={`${avatar}`} style={{margin: '5px'}}/>
                : <Avatar />} 
              <Button
                href={`/users/${localStorage.getItem('id')}`}
                color="primary"
                to={`/users/${localStorage.getItem('id')}`}
              >
               {localStorage.getItem('user').replace(/['"]+/g, '')}
              </Button><Button
                href="/logout"
                color="error"
                to="/logout"
              >
                Logout
              </Button>

            </>

            : <div style={{display: 'flex'}}>
              
                  <nav style={{ margin: '10px' }}>
                <Link
                  color="textPrimary"
                  href="/register"
                  to="/register"
                >
                  Register
                </Link>
              </nav>
              <Button
                href="/login"
                color="primary"
                variant="outlined"
                to="/login"
              >
                Login
              </Button>
            </div>

            }
          </div>

        </Toolbar>
      </div>
      </AppBar>
      
      <Routes>
              <Route path="/search/artists/:string" element={<SearchArtist data={data}/>} />
              <Route path="/search/albums/:string" element={<SearchAlbum data={data} />} />
              <Route path="/search/genres/:string" element={<SearchGenre data={data} />} />
              <Route path="/" element={<Homepage />} />
              <Route exact path="/posts" element={<Posts />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login setUserSignedIn={setUserSignedIn} setUserAvatar={setUserAvatar} />} />
              <Route path="/logout" element={<Logout setUserSignedIn={setUserSignedIn} />} />
              <Route path="/artist/new" element={<NewArtist />} />
              <Route path="/genre/new" element={<NewGenre />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/genres/:name" element={<GenreAlbums />} />
              <Route path="/artists/" element={<Artists />} />
              <Route path="/artist/:id" element={<Artist />} />
              <Route path="/editprofile/" element={<EditProfile />} />
              <Route path="/users/:id" element={<UserPage />} />
              <Route path="/artist/:id/newalbum" element={<NewAlbum />} />
              <Route path="/post/:postid/edit" element={<EditPost />} />
              <Route path="/artist/:id/album/:id" element={<Album setAlbumInfo={setAlbumInfo}/>} />
              <Route path="/album/:albumid/:artistid/newreview" element={<NewPost albumInfo={albumInfo}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
