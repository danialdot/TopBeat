import React, { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import truncate from "./truncate";
import axios from "axios";

const truncateArtist = (artists, max) => {
  if (!artists || artists.length === 0) return "";
  const names = artists.map((a) => a.name);
  let result = "";
  for (let i = 0; i < names.length; i++) {
    const next = result ? result + ", " + names[i] : names[i];
    if (next.length > max) {
      if (result) return result + "…";
      // If even the first artist is too long, truncate it
      return truncate(names[i], max);
    }
    result = next;
  }
  return result;
};

const SongPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get songCount from location.state, fallback to 1, as an initial state field
  const [songCount] = useState(
    (location.state && location.state.songCount) || 1
  );

  const [topSongs, setTopSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("spotify_access_token");
  };

  const deleteTokenFromLocalStorage = () => {
    return localStorage.clear();
  };

  const logout = useCallback(() => {
    deleteTokenFromLocalStorage();
    navigate(0);
  }, [navigate]);

  const getTopSongs = useCallback(
    async (accessToken, count) => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              limit: count,
              time_range: "medium_term",
            },
          }
        );

        if (response.data.items && response.data.items.length > 0) {
          setTopSongs(response.data.items);
        } else {
          setTopSongs([]);
          console.log("No top tracks found for the user.");
          logout();
        }
      } catch (error) {
        setTopSongs([]);
        console.error("Error fetching most played tracks:", error);
        logout();
      } finally {
        setLoading(false);
      }
    },
    [logout]
  );

  React.useEffect(() => {
    const cachedToken = getTokenFromLocalStorage();
    if (cachedToken) {
      getTopSongs(cachedToken, songCount);
    } else {
      navigate(`/`);
    }
    // Only re-fetch when songCount changes
  }, [navigate, getTopSongs, songCount]);

  // Handler to open Spotify link in a new tab
  const handleOpenSpotify = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Responsive: detect mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;

  // Outer wrapper to center everything
  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <button
        className="ios-back-button"
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: isMobile ? 8 : 16,
          left: isMobile ? 8 : 16,
          background: "rgba(255,255,255,0.8)",
          border: "none",
          borderRadius: 8,
          padding: 6,
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          zIndex: 10,
        }}
      >
        <ArrowBackIos fontSize="small" />
      </button>
      <div
        className="app-container"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: loading ? "center" : "flex-start",
          paddingTop: isMobile ? 56 : 64,
          width: "100vw",
          boxSizing: "border-box",
        }}
      >
        {" "}
        {loading && (
          <div style={{ textAlign: "center", fontSize: 18, marginTop: 40 }}>
            Loading...
          </div>
        )}
        {!loading && topSongs.length > 0 && (
          <div
            className="song-page-container"
            style={{
              width: "100%",
              maxWidth: 800,
              margin: isMobile ? "0" : "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                fontWeight: 700,
                fontSize: isMobile ? 20 : 26,
                margin: "32px 0 24px 0",
                letterSpacing: 0.5,
                textShadow: "0 2px 8px rgba(0,0,0,0.07)",
                wordBreak: "break-word",
              }}
            >
              {songCount === 1
                ? "Your Most Played Song:"
                : `Your Top ${songCount} Song${songCount > 1 ? "s" : ""}`}
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: isMobile ? 8 : 32,
                justifyContent: "center",
                alignItems: "flex-start",
                paddingBottom: isMobile ? 16 : 0,
              }}
            >
              {topSongs.map((song, idx) => (
                <div
                  key={song.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: 180,
                    maxWidth: 220,
                    width: "auto",
                    padding: 20,
                    margin: 0,
                    cursor:
                      song.external_urls && song.external_urls.spotify
                        ? "pointer"
                        : "default",
                    transition: "transform 0.12s",
                  }}
                  onClick={() =>
                    handleOpenSpotify(
                      song.external_urls && song.external_urls.spotify
                    )
                  }
                  title={
                    song.external_urls && song.external_urls.spotify
                      ? "Open in Spotify"
                      : ""
                  }
                >
                  <img
                    src={
                      song.album.images && song.album.images[0]
                        ? song.album.images[0].url
                        : ""
                    }
                    alt={song.name}
                    style={{
                      width: isMobile ? 140 : 160,
                      height: isMobile ? 140 : 160,
                      borderRadius: 14,
                      objectFit: "cover",
                      marginBottom: 10,
                    }}
                  />
                  <h3
                    style={{
                      margin: "10px 0 6px 0",
                      fontSize: isMobile ? 15 : 20,
                      fontWeight: 600,
                      textAlign: "center",
                      color: "#ffffff",
                      lineHeight: 1.2,
                      letterSpacing: 0.2,
                      wordBreak: "break-word",
                    }}
                  >
                    {!(songCount === 1 && idx === 0) && (
                      <span
                        style={{
                          color: "#1db954",
                          fontWeight: 700,
                          marginRight: 4,
                        }}
                      >
                        {idx + 1}.
                      </span>
                    )}
                    {truncate(song.name, isMobile ? 12 : 16)}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: isMobile ? 12 : 15,
                      color: "#888",
                      textAlign: "center",
                      fontWeight: 500,
                      wordBreak: "break-word",
                    }}
                  >
                    {truncateArtist(song.artists, isMobile ? 14 : 18)}
                  </p>
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      fontSize: isMobile ? 11 : 13,
                      color: "#888",
                      textAlign: "center",
                      wordBreak: "break-word",
                    }}
                  >
                    Album: {truncate(song.album.name, isMobile ? 14 : 18)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {!loading && topSongs.length === 0 && (
          <div style={{ textAlign: "center", fontSize: 18, marginTop: 40 }}>
            No top songs found.
          </div>
        )}
      </div>
    </div>
  );
};

export default SongPage;
