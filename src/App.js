import logo from './logo.svg';
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
import { AppBar, Toolbar, Typography, CssBaseline, Link, Button, BottomNavigation } from '@mui/material'
import {useState, useEffect} from 'react'
import {Avatar} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchArtist from './components/SearchArtist';
import SearchAlbum from './components/SearchAlbum';
import SearchGenre from './components/SearchGenre';
import axios from 'axios';
import GenreAlbums from './components/GenreAlbums';
import Artists from './components/Artists';
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
    <div className="App">
      <CssBaseline />
      <Link
        style={{fontSize:"50px"}}
        href="/"
        underline="none"
        color="textPrimary"
      >
        Tune
      </Link>
      <AppBar position="static"
        color="default"
        elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
          >
            <Link

              href="/"
              underline="none"
              color="textPrimary"
            >
              Home
            </Link>
          </Typography>
          <form onSubmit={handleSubmit}>
            <input type="text" id="search" onChange={handleChange} value={data.search} /><br></br>
            <select type="text" id="category" onChange={handleChange} value={data.category}>
              <option value="artists">Artist</option>
              <option value="albums">Album</option>
              <option value="genres">Genre</option>
            </select>
            <input type="submit" className="btn btn-danger" value="search" />
          </form>
          {userSignedIn
            ? <>
              {avatar
                ? <Avatar src={`${avatar}`} />
                : <Avatar />} 
              <Button
                href="/editprofile"
                color="primary"
                variant="outlined"
                to={`/editprofile`}
              >
                Edit Profile
              </Button><Button
                href="/logout"
                color="primary"
                variant="outlined"
                to="/logout"
              >
                Logout {localStorage.getItem('user')}
              </Button>

            </>

            : <div>
              <nav>
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


        </Toolbar>
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
