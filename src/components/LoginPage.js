import React from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

const LoginPage = () => {
  const navigate = useNavigate();

  const clientId =
    process.env.REACT_APP_SPOTIFY_CLIENT_ID || "YOUR_DEFAULT_CLIENT_ID";
  const redirectUri =
    process.env.REACT_APP_SPOTIFY_REDIRECT_URI || "http://localhost:3000/";

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("spotify_access_token");
  };

  const saveTokenToLocalStorage = (token) => {
    localStorage.setItem("spotify_access_token", token);
  };

  const authenticateSpotify = () => {
    const scopes = [
      "playlist-modify-private",
      "playlist-modify-public",
      "user-library-read",
      "user-top-read",
      "user-follow-read",
    ].join(",");

    const url = `https://accounts.spotify.com/authorize?${queryString.stringify(
      {
        response_type: "token",
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: scopes,
      }
    )}`;

    window.location.href = url;
  };

  React.useEffect(() => {
    const handleSpotifyRedirect = () => {
      const hashParams = queryString.parse(window.location.hash);

      if (hashParams.access_token) {
        saveTokenToLocalStorage(hashParams.access_token);
        navigate(`/home`);
      }
    };

    const cachedToken = getTokenFromLocalStorage();
    if (cachedToken) {
      navigate(`/home`);
    } else {
      handleSpotifyRedirect();
    }
  }, [navigate]);

  return (
    <div className="app-container">
      <div className="login-container">
        <div className="app-description">
          <h1>🎧 TopBeat</h1>
          <h2>Discover your top song and artist</h2>
          <p>
            Connect your Spotify account, and we'll show your most-played track.
          </p>
        </div>
        <button onClick={authenticateSpotify}>Connect to Spotify</button>
      </div>
    </div>
  );
};

export default LoginPage;
