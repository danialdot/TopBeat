import React, { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import truncate from "./truncate";
import axios from "axios";

// // Helper to truncate artist names (array of objects with .name)
// const truncateArtist = (artists, max) => {
//   if (!artists || artists.length === 0) return "";
//   const names = artists.map((a) => a.name);
//   let result = "";
//   for (let i = 0; i < names.length; i++) {
//     const next = result ? result + ", " + names[i] : names[i];
//     if (next.length > max) {
//       if (result) return result + "…";
//       // If even the first artist is too long, truncate it
//       return truncate(names[i], max);
//     }
//     result = next;
//   }
//   return result;
// };

const ArtistPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get artistCount from location.state, fallback to 1, as an initial state field
  const [artistCount] = useState(
    (location.state && location.state.artistCount) || 1
  );

  const [topArtists, setTopArtists] = useState([]);
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

  const getTopArtists = useCallback(
    async (accessToken, count) => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/top/artists",
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
          setTopArtists(response.data.items);
        } else {
          setTopArtists([]);
          console.log("No top artists found for the user.");
          logout();
        }
      } catch (error) {
        setTopArtists([]);
        console.error("Error fetching most played artists:", error);
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
      getTopArtists(cachedToken, artistCount);
    } else {
      navigate(`/`);
    }
    // Only re-fetch when artistCount changes
  }, [navigate, getTopArtists, artistCount]);

  // Handler to open artist's Spotify link in a new tab
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
        {!loading && topArtists.length > 0 && (
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
              {artistCount === 1
                ? "Your Most Played Artist:"
                : `Your Top ${artistCount} Artist${artistCount > 1 ? "s" : ""}`}
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
              {topArtists.map((artist, idx) => (
                <div
                  key={artist.id}
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
                      artist.external_urls && artist.external_urls.spotify
                        ? "pointer"
                        : "default",
                    transition: "transform 0.12s",
                  }}
                  onClick={() =>
                    handleOpenSpotify(
                      artist.external_urls && artist.external_urls.spotify
                    )
                  }
                  title={
                    artist.external_urls && artist.external_urls.spotify
                      ? "Open in Spotify"
                      : ""
                  }
                >
                  <img
                    src={
                      artist.images && artist.images[0]
                        ? artist.images[0].url
                        : ""
                    }
                    alt={artist.name}
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
                      color: "#222",
                      lineHeight: 1.2,
                      letterSpacing: 0.2,
                      wordBreak: "break-word",
                    }}
                  >
                    {!(artistCount === 1 && idx === 0) && (
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
                    {truncate(artist.name, isMobile ? 12 : 16)}
                  </h3>
                  {/* <p
                    style={{
                      margin: 0,
                      fontSize: isMobile ? 12 : 15,
                      color: "#555",
                      textAlign: "center",
                      fontWeight: 500,
                      wordBreak: "break-word",
                    }}
                  >
                    {truncateArtist(
                      artist.genres
                        ? artist.genres.map((g) => ({ name: g }))
                        : [],
                      isMobile ? 14 : 18
                    )}
                  </p> */}
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      fontSize: isMobile ? 11 : 13,
                      color: "#888",
                      textAlign: "center",
                      wordBreak: "break-word",
                    }}
                  >
                    Popularity: {artist.popularity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {!loading && topArtists.length === 0 && (
          <div style={{ textAlign: "center", fontSize: 18, marginTop: 40 }}>
            No top artists found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistPage;
