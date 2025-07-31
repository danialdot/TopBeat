import React, { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import axios from "axios";
import truncate from "./truncate";

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

  return (
    <div>
      <button className="ios-back-button" onClick={() => navigate(-1)}>
        <ArrowBackIos fontSize="small" />
      </button>
      <div className="app-container">
        {loading && <div>Loading...</div>}
        {!loading && topArtists.length > 0 && (
          <div className="artist-page-container">
            <h2>
              Your Top {artistCount} Artist{artistCount > 1 ? "s" : ""}
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 24,
                justifyContent: "center",
              }}
            >
              {topArtists.map((artist, idx) => (
                <div
                  key={artist.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: 160,
                  }}
                >
                  <img
                    src={
                      artist.images && artist.images[0]
                        ? artist.images[0].url
                        : ""
                    }
                    alt={artist.name}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginBottom: 8,
                    }}
                  />
                  <h3 style={{ margin: "8px 0 4px 0" }}>
                    {idx + 1}. {truncate(artist.name, 12)}
                  </h3>
                  <p style={{ margin: 0, fontSize: 14 }}>
                    Popularity: {artist.popularity}
                  </p>
                  {/* Example for album name truncation if album info is available */}
                  {artist.album && artist.album.name && (
                    <p style={{ margin: 0, fontSize: 13 }}>
                      Album: {truncate(artist.album.name, 12)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {!loading && topArtists.length === 0 && (
          <div>No top artists found.</div>
        )}
      </div>
    </div>
  );
};

export default ArtistPage;
