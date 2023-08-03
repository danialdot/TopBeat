import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const MenuPage = () => {
  const navigate = useNavigate();

  const navigateToArtistPage = () => {
    navigate(`/artist`);
  };

  const navigateToSongPage = () => {
    navigate(`/song`);
  };

  return (
    <div className="app-container">
      <div className="menu-container">
        <button onClick={navigateToArtistPage}>Artist</button>
        <button onClick={navigateToSongPage}>Song</button>
      </div>
    </div>
  );
};

export default MenuPage;
