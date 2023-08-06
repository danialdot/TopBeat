import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaTwitter, FaGithub, FaMedium } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./App.css";

import LoginPage from "./components/LoginPage";
import SongPage from "./components/SongPage";
import ArtistPage from "./components/ArtistPage";
import HomePage from "./components/HomePage";

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
            <div className="social-icons">
              <a href="https://github.com/danialdot/TopBeat" className="social-link">
                <FaGithub style={{ margin: "0 10px" }} size={24} />
              </a>
              <a href="https://medium.danials.space" className="social-link">
                <FaMedium style={{ margin: "0 10px" }} size={24} />
              </a>
              <a href="https://twitter.com/DanialBaka" className="social-link">
                <FaTwitter style={{ margin: "0 10px" }} size={24} />
              </a>
            </div>
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
            <Route path="/" element={<LoginPage />} />
            <Route path="/song" element={<SongPage />} />
            <Route path="/artist" element={<ArtistPage />} />
            <Route path="/home" element={<HomePage />} />
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
