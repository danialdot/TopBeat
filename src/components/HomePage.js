import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const navigateToArtistPage = () => {
    navigate(`/artist`);
  };

  const navigateToSongPage = () => {
    navigate(`/song`);
  };

  const navigateToCreatePlaylistPage = () => {
    navigate(`/playlist-liked-songs`);
  };

  return (
    <div className="app-container">
      <div className="home-container">
        <button onClick={navigateToArtistPage}>Artist</button>
        <button onClick={navigateToSongPage}>Song</button>
        <button onClick={navigateToCreatePlaylistPage}>✨ Liked Playlist</button>
      </div>
    </div>
  );
};

export default HomePage;
