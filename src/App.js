import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import PostLoadingComponent from './components/PostLoading'
import Header from './components/Header'
import Footer from './components/Footer'
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

function App() {
  

  return (
    <div className="App">

      <Header />
      <Routes>

              <Route path="/" element={<Homepage />} />
              <Route exact path="/posts" element={<Posts />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/artist/new" element={<NewArtist />} />
              <Route path="/genre/new" element={<NewGenre />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/artist/:id" element={<Artist />} />
              <Route path="/editprofile/" element={<EditProfile />} />
              <Route path="/artist/:id/newalbum" element={<NewAlbum />} />
              <Route path="/post/:postid/edit" element={<EditPost />} />
              <Route path="/artist/:id/album/:id" element={<Album />} />
              <Route path="/album/:albumid/:artistid/newreview" element={<NewPost />} />
      </Routes>
    </div>
  );
}

export default App;
