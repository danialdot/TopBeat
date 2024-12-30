import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";

import axios from "axios";

const ArtistPage = () => {
  const navigate = useNavigate();
  const [mostPlayedArtist, setMostPlayedArtist] = useState(null);

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("spotify_access_token");
  };

  const getMostPlayedArtist = async (accessToken) => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/top/artists",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            limit: 1,
            time_range: "medium_term",
          },
        }
      );

      if (response.data.items && response.data.items.length > 0) {
        const mostPlayed = response.data.items[0];
        setMostPlayedArtist(mostPlayed);
      } else {
        console.log("No top artists found for the user.");
        logout();
      }
    } catch (error) {
      console.error("Error fetching most played artist:", error);
      logout();
    }
  };

  React.useEffect(() => {
    const cachedToken = getTokenFromLocalStorage();
    if (cachedToken) {
      getMostPlayedArtist(cachedToken);
    } else {
      navigate(`/`);
    }
  }, [navigate]);

  const deleteTokenFromLocalStorage = () => {
    return localStorage.clear();
  };

  const logout = () => {
    deleteTokenFromLocalStorage();
    navigate(`/`);
    navigate(0);
  };

  return (
    <div>
      <button className="ios-back-button" onClick={() => navigate(-1)}>
        <ArrowBackIos fontSize="small" />
      </button>
      <div className="app-container">
        {mostPlayedArtist && (
          <div className="artist-page-container">
            <h2>Your Most Played Artist:</h2>
            <img src={mostPlayedArtist.images[0].url} alt="Artist" />
            <h3>{mostPlayedArtist.name}</h3>
            <p>Popularity: {mostPlayedArtist.popularity}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistPage;
