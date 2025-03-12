import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaTwitter, FaGithub, FaMedium } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./App.css";

import LoginPage from "./components/LoginPage";
import SongPage from "./components/SongPage";
import ArtistPage from "./components/ArtistPage";
import CreateLikedPlaylistPage from "./components/CreateLikedPlaylistPage";
import HomePage from "./components/HomePage";
import Terms from "./terms";
import Policy from "./policy";

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
              <a
                href="https://github.com/danialdot/TopBeat"
                className="social-link"
              >
                <FaGithub style={{ margin: "0 10px" }} size={24} />
              </a>
              <a href="https://medium.danials.space" className="social-link">
                <FaMedium style={{ margin: "0 10px" }} size={24} />
              </a>
              <a href="https://x.com/utsubyononeko" className="social-link">
                <FaTwitter style={{ margin: "0 10px" }} size={24} />
              </a>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

const TermsAndPolicy = () => {
  return (
    <div
      className="terms-policy-container"
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "center",
        padding: "10px 0",
      }}
    >
      <a
        className="terms-btn"
        href="/terms"
        style={{
          padding: "10px",
          color: "inherit",
          textDecoration: "none",
        }}
        onMouseOver={(e) => (e.target.style.color = "gray")}
        onMouseOut={(e) => (e.target.style.color = "inherit")}
        onMouseDown={(e) => (e.target.style.color = "white")}
        onMouseUp={(e) => (e.target.style.color = "gray")}
      >
        Terms of Service
      </a>
      <a
        className="policy-btn"
        href="/policy"
        style={{
          padding: "10px",
          color: "inherit",
          textDecoration: "none",
        }}
        onMouseOver={(e) => (e.target.style.color = "gray")}
        onMouseOut={(e) => (e.target.style.color = "inherit")}
        onMouseDown={(e) => (e.target.style.color = "white")}
        onMouseUp={(e) => (e.target.style.color = "gray")}
      >
        Privacy Policy
      </a>
    </div>
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
            <Route
              path="/playlist-liked-songs"
              element={<CreateLikedPlaylistPage />}
            />
            <Route path="/home" element={<HomePage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/policy" element={<Policy />} />
          </Routes>
        </div>
        <nav>
          <Footer />
          <TermsAndPolicy />
        </nav>
      </Router>
    </div>
  );
};

export default App;
