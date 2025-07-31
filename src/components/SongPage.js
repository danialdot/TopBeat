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

  return (
    <div>
      <button className="ios-back-button" onClick={() => navigate(-1)}>
        <ArrowBackIos fontSize="small" />
      </button>
      <div className="app-container">
        {loading && <div>Loading...</div>}
        {!loading && topSongs.length > 0 && (
          <div className="song-page-container">
            <h2>
              Your Top {songCount} Song{songCount > 1 ? "s" : ""}
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 24,
                justifyContent: "center",
              }}
            >
              {topSongs.map((song, idx) => (
                <div
                  key={song.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: 160,
                  }}
                >
                  <img
                    src={
                      song.album.images && song.album.images[0]
                        ? song.album.images[0].url
                        : ""
                    }
                    alt={song.name}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 12,
                      objectFit: "cover",
                      marginBottom: 8,
                    }}
                  />
                  <h3 style={{ margin: "8px 0 4px 0" }}>
                    {idx + 1}. {truncate(song.name, 10)}
                  </h3>
                  <p style={{ margin: 0, fontSize: 14 }}>
                    {truncateArtist(song.artists, 12)}
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: "#888" }}>
                    Album: {truncate(song.album.name, 12)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {!loading && topSongs.length === 0 && <div>No top songs found.</div>}
      </div>
    </div>
  );
};

export default SongPage;
