import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
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
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
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
          <Route path="/album/:albumid/:artistid/newreview" element={<NewPost/>} />
        </Routes>
      <Footer />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
