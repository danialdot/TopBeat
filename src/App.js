import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./App.css";

import HomePage from "./HomePage";
import SongPage from "./SongPage";
import ArtistPage from "./ArtistPage";
import MenuPage from "./MenuPage";

const Footer = () => {
  const navigate = useNavigate();
  const [showFooter, setShowFooter] = useState(false);

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("spotify_access_token");
  };

  const deleteTokenFromLocalStorage = () => {
    return localStorage.clear();
  };

  const logout = () => {
    deleteTokenFromLocalStorage();
    navigate(`/`);
    setShowFooter(false);
  };

  React.useEffect(() => {
    const cachedToken = getTokenFromLocalStorage();
    if (cachedToken) {
      setShowFooter(true);
    }
  }, []);

  return (
    <>
      {showFooter && (
        <div className="footer-content">
          <footer>
            <button onClick={logout}>logout</button>
          </footer>
        </div>
      )}
    </>
  );
};

const App = () => {
  return (
    <div className="app">
      <Router>
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/song" element={<SongPage />} />
            <Route path="/artist" element={<ArtistPage />} />
            <Route path="/menu" element={<MenuPage />} />
          </Routes>
        </div>
        <nav>
          <Footer />
        </nav>
      </Router>
    </div>
  );
};

export default App;
