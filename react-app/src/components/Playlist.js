import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getOnePlaylistThunk, deletePlaylistThunk } from "../store/playlist";
import { setPlaylistSongsThunk } from "../store/songs";
import EditPlaylistFormModal from "./EditPlaylistForm";

const DisplayPlaylist = () => {
  const { id } = useParams();
  const history = useHistory();
  const [songsNotInStore, setSongsNotInStore] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState({});
  const user = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.songs);
  const playlists = useSelector((state) => state.playlists);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deletePlaylistThunk(id));
  };

  useEffect(() => {
    (async () => {
      if (!playlists[id]) {
        const error = await dispatch(getOnePlaylistThunk(id));
        if (error) {
          history.push("/");
        }
      }
    })();
  }, [dispatch, id, playlists]);

  useEffect(() => {
    if (playlists[id]) {
      setCurrentPlaylist(playlists[id]);
    }
  }, [playlists, id]);

  useEffect(() => {
    currentPlaylist?.songs?.forEach((songId) => {
      if (!songs[songId]) {
        if (!songsNotInStore.includes(songId)) {
          setSongsNotInStore((prevState) => [...prevState, songId]);
        }
      }
    });
  }, [dispatch, songs, currentPlaylist, songsNotInStore]);

  useEffect(() => {
    if (songsNotInStore.length) {
      dispatch(setPlaylistSongsThunk(songsNotInStore));
    }
  }, [dispatch, songsNotInStore]);

  return (
    <div>
      <EditPlaylistFormModal />
      <button onClick={handleDelete}>Delete Playlist</button>
      <h2>{currentPlaylist?.title}</h2>
      <h3>{currentPlaylist?.description}</h3>
      {currentPlaylist?.songs?.map((songId) => {
        return (
          <div>
            <div>{songs[songId]?.title}</div>
            <div>{songs[songId]?.album}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayPlaylist;
