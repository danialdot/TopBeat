import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const navigateToArtistPage = () => {
    navigate(`/artist`);
  };

  const navigateTo5ArtistPage = () => {
    navigate(`/artist`, { state: { artistCount: 5 } });
  };

  const navigateToSongPage = () => {
    navigate(`/song`);
  };

  const navigateTo5SongPage = () => {
    navigate(`/song`, { state: { songCount: 5 } });
  };

  const navigateToCreatePlaylistPage = () => {
    navigate(`/playlist-liked-songs`);
  };

  return (
    <div className="app-container">
      <div className="home-container">
        <button onClick={navigateToArtistPage}>🎤 Top 1 Artist</button>
        <button onClick={navigateTo5ArtistPage}>🎤 Top 5 Artists</button>
        <button onClick={navigateToSongPage}>🎵 Top 1 Song</button>
        <button onClick={navigateTo5SongPage}>🎵 Top 5 Song</button>
        <button onClick={navigateToCreatePlaylistPage}>
          💖 Liked Songs Playlist
        </button>
      </div>
    </div>
  );
};

export default HomePage;
