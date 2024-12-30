import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import axios from "axios";

const CreateLikedPlaylistPage = () => {
  const navigate = useNavigate();
  const [playlistCreated, setPlaylistCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [lastTrack, setLastTrack] = useState(null);
  const [trackCount, setTrackCount] = useState(0);

  const getAccessToken = () => localStorage.getItem("spotify_access_token");

  const fetchLikedSongs = async (token) => {
    let limit = 50,
      page = 0,
      done = false,
      trackIds = [];
    while (!done) {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me/tracks", {
          headers: { Authorization: `Bearer ${token}` },
          params: { limit, offset: page * limit },
        });

        if (data.items.length === 0) {
          setTrackCount(data.total);
          done = true;
        } else {
          setTrackCount(data.offset + data.items.length);
          setLastTrack(data.items.slice(-1)[0].track);
          trackIds.push(...data.items.map(({ track }) => track.id));
        }
        page++;
      } catch (error) {
        console.error("Fetching error:", error);
        done = true;
      }
    }
    return trackIds;
  };

  const createPlaylist = async (token, userId) => {
    try {
      const date = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date());
      const title = `Liked Songs - ${date}`;
      setPlaylistTitle(title);
      const { data } = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        { name: title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    } catch (error) {
      console.error("Creation error:", error);
    }
  };

  const addTracks = async (token, playlistId, ids) => {
    try {
      for (let i = 0; i < ids.length; i += 100) {
        await axios.post(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            uris: ids.slice(i, i + 100).map((id) => `spotify:track:${id}`),
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setPlaylistCreated(true);
      setLoading(false);
    } catch (error) {
      console.error("Adding error:", error);
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    const token = getAccessToken();

    if (!token) {
      navigate("/");
      return;
    }

    const ids = await fetchLikedSongs(token);
    if (!ids.length) {
      setLoading(false);
      return;
    }

    const { data: user } = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const playlist = await createPlaylist(token, user.id);

    if (playlist) {
      await addTracks(token, playlist.id, ids);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!getAccessToken()) navigate("/");
  }, [navigate]);

  return (
    <div>
      <button className="ios-back-button" onClick={() => navigate(-1)}>
        <ArrowBackIos fontSize="small" />
      </button>
      <div className="app-container">
        <div className="create-playlist-container">
          {playlistCreated ? (
            <div className="playlist-track-container">
              <h2>Playlist:</h2>
              <h1>{playlistTitle}</h1>
            </div>
          ) : loading ? (
            trackCount ? (
              <div className="playlist-track-container">
                <h2>{trackCount} songs found</h2>
                {lastTrack && <img src={lastTrack.album.images?.[0]?.url} alt="Last Track" />}
                <h3>{lastTrack?.name}</h3>
                <p>{lastTrack?.artists?.[0]?.name}</p>
              </div>
            ) : (
              <div className="playlist-track-container">
                <h2>Preparing...</h2>
              </div>
            )
          ) : (
            <div className="create-playlist-container">
              <div className="create-playlist-container">
                <div className="create-playlist-description">
                  <h1>Playlist Generator</h1>
                  {/* <p>Automatically generate a playlist from your liked songs on Spotify with one click.</p> */}
                  <p>Want to share your Spotify liked songs?</p>
                  <br/>
                  {/* <p>Now you can create a playlist with all your liked tracks and share it effortlessly. ✨</p> */}
                  <p>Easily generate a playlist from all your liked songs with just one click, ready to share with anyone. ✨</p>
                </div>
                <button onClick={handleCreate}>Generate Playlist</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLikedPlaylistPage;
